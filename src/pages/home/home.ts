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

    this.collection = af.collection<Post>("posts"); // Specifies the collection called posts in the DB

    this.posts = this.collection.snapshotChanges() // for realtime looking for changes in that collection
      .map(actions => {
        return actions.map(action => {
          let data = action.payload.doc.data() as Post;
          let id = action.payload.doc.id;

          return {
            id,
            ...data  // Spread operator, packs out the data in the object & returns it with metadata (ID) and the data (fields) in the post
          };
        })
      });

  }

  logout() {
    this.af.app.auth().signOut();
  }

}
