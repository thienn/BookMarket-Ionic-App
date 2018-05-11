import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

import { Post } from '../../models/Post';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public collection: AngularFirestoreCollection<Post>;
  public posts: Observable<Post[]>;

  constructor(public navCtrl: NavController, private af: AngularFirestore) {

    this.collection = af.collection<Post>("posts"); // spesifiserer hvilken collection vi skal koble opp til. Posts i dette tilfellet

    this.posts = this.collection.snapshotChanges() // Setter opp en funksjonalitet som henter ut data fra post med metadata som ID. Med real time observering gjennom Observable for å se etter forandringer og hente inn ny data når det blir lagt til i Firebase
      .map(actions => {
        return actions.map(action => {
          let data = action.payload.doc.data() as Post;
          let id = action.payload.doc.id;

          return {
            id,
            ...data // Spread operator, pakker ut data fra objektet, og returnerer med Metadata (ID) og data fra (fields) i posten.
          };
        })
      });

  }

  // Sender over posten vi vil se på, samt collection så vi slipper å sette opp det på nytt når vi ankommer DetailPage eller AddPostPage. Spesielt i Detail, med tanke på der skal vi sette opp en annen for subcollection
  goToDetailPage(post: Post) {
    this.navCtrl.push('DetailPage', {
      post,
      postCollection: this.collection
    })
  }

  goToAddPostPage() {
    this.navCtrl.push('AddPostPage', {
      postCollection: this.collection
    })
  }

  logout() {
    this.af.app.auth().signOut();
  }

}
