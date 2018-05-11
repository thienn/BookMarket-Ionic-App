import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

import { Post } from '../../models/Post';

import { Observable } from 'rxjs/Observable';


/**
 * Generated class for the MyPostsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-posts',
  templateUrl: 'my-posts.html',
})
export class MyPostsPage {
  public collection: AngularFirestoreCollection<Post>;
  public posts: Observable<Post[]>;
  public CurrentAuthor = this.afs.app.auth().currentUser.email;


  constructor(public navCtrl: NavController, public navParams: NavParams, private afs: AngularFirestore) {
   // For testing for å se om det er riktig bruker
   console.log(this.CurrentAuthor);

    // Setter opp collection og spesifiserer posts som den vi vil se på, deretter henter den via Query alt som er koblet til innlogget bruker som author
    this.collection = afs.collection<Post>('posts', (ref) => {
      return ref.where('author', '==', this.CurrentAuthor)// SELECT * FROM posts WHERE author = innlogget bruker
    });

    this.posts = this.collection.snapshotChanges() // Forklart i de andre, henter ut data og meta data for poster samt se etter forandringer i denne collection
      .map(actions => {
        return actions.map(action => {
          let data = action.payload.doc.data() as Post;
          let id = action.payload.doc.id;

          return {
            id,
            ...data  // Spread opderator, pakker ut objektet med metadata (ID) og data (fields)
          };
        })
      });
  }

  goToDetailPage(post: Post) {
    this.navCtrl.push('DetailPage', {
      post,
      postCollection: this.collection
    })
  }

  // Sender over bare post informasjon, trenger ikke å sende hele collection som i goToDetailPage() ettersom i ManagePostPage setter vi opp collection på nytt.
  goToManagePostPage(post: Post) {
    this.navCtrl.push('ManagePostPage', {
      post
    })
  }

  logout() {
    this.afs.app.auth().signOut();
  }


}
