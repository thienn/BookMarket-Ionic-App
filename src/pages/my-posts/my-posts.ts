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
   // this.CurrentAuthor = this.afs.app.auth().currentUser.email;
   console.log(this.CurrentAuthor);

    // this.collection = afs.collection<Post>("posts"); // Specifies the collection called posts in the DB
    this.collection = afs.collection<Post>('posts', (ref) => {
      return ref.where('author', '==', this.CurrentAuthor)// SELECT * FROM posts WHERE author = Current logged in account
    });

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

  goToDetailPage(post: Post) {
    this.navCtrl.push('DetailPage', {
      post,
      postCollection: this.collection
    })
  }

  goToManagePostPage(post: Post) {
    this.navCtrl.push('ManagePostPage', {
      post
      /*
      post,
      postCollection: this.collection
      */
    })
  }

  logout() {
    this.afs.app.auth().signOut();
  }


}
