import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Post } from '../../models/Post';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  public post: Post;
  public postCollection: AngularFirestoreCollection<Post>;

  public comments: Observable<any[]>;
  public commentText: string=""; // Input text for new comment

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // Connect to post
    this.post = navParams.get('post');
    this.postCollection = navParams.get('postCollection');

    // To show the comments 
    this.comments = this.postCollection
      .doc(this.post.id)
      .collection("comments")
      .valueChanges();
  }

  // Add comment with the text from commentText which is connected to the input field in detail.HTML
  addComment() {
    this.postCollection
      .doc(this.post.id)
      .collection("comments")
      .add({
        comment: this.commentText
      })
      .then(() => {
        // Reset the comment field if the post go through successfully
        this.commentText = "";
      })
  }  

}
