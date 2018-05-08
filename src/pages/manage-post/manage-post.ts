import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Post } from '../../models/Post';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
// import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the ManagePostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manage-post',
  templateUrl: 'manage-post.html',
})
export class ManagePostPage {
  public post: Post;
  public postCollection: AngularFirestoreCollection<Post>;

  // Define variables to use, empty until connected to post 
  public postTitle: string = ""; //Empty placeholder that will be the string that get sent to Firebase as title of post
  public postBody: string = ""; //Empty placeholder that will be the string that get sent to Firebase as content of post (body)
  public postPrice: string = "";


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.post = navParams.get('post');
    this.postCollection = navParams.get('postCollection');

    console.log(this.post.title);
    console.log(this.post.id);
    // Now that we are connected to post, we can populate the variables needed to manipulate.
    this.postTitle = this.post.title; //Empty placeholder that will be the string that get sent to Firebase as title of post
    this.postBody = this.post.body; //Empty placeholder that will be the string that get sent to Firebase as content of post (body)
    this.postPrice = this.post.price;


  }

  updatePost() {

    console.log(this.post.id);

    this.postCollection.doc(this.post.id).update({
      title: this.postTitle,
      body: this.postBody,
      price: this.postPrice
    } as Post).then(() => {

    })
    /*
    this.postCollection.doc(this.post.id).update({
      title: this.postTitle, // Title to the post
      body: this.postBody, // Specify the description / body of the content
      price: this.postPrice // price
    } as Post).then(() => {
      /*
      // When done toast message about it
      this.toast.create({
        message: "Done posting",
        duration: 2500
      }).present();
      
      
    });
    */
    /*
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
      */

  }

  deletePost() {

  }

}
