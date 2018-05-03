import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Camera } from '@ionic-native/camera';

import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

import { Post } from '../../models/Post';

/**
 * Generated class for the AddPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-post',
  templateUrl: 'add-post.html',
})
export class AddPostPage {
  public postCollection: AngularFirestoreCollection<Post>;
  public postTitle: string =""; //Empty placeholder that will be the string that get sent to Firebase as title of post
  public postBody: string =""; //Empty placeholder that will be the string that get sent to Firebase as content of post (body)
  private previewImage: string = ""; 

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, private camera: Camera, private afStorage: AngularFireStorage, private af: AngularFirestore) {
    this.postCollection = navParams.get('postCollection');
  }

  addPost() {

    // Generate a filename for the picture we are going to upload, based on login email and seconds in UNIX phone time (1.1.1970)
    //  let imageFileName = '${this.af.app.auth().currentUser.email}_${new Date().getTime()}.png';
    let imageFileName = `${this.af.app.auth().currentUser.email}_${new Date().getTime()}.png`;

    // Then make a task that takes care of the uploading
    let task = this.afStorage
     .ref(imageFileName) // Specify filename for the picture we want to be is the generated one above
     .putString(this.previewImage, 'base64', { contentType: 'image/png'}); // Upload picture vi just took with Base64-format

    // Then make an event which the app can use to listen to when the picture is done uploading
    let uploadEvent = task.downloadURL();

          // Here the app listen to when the picture is done uploading. When it is, get access to the picture's
      // URL on the server Firebase
      uploadEvent.subscribe((uploadImageUrl) => {

        this.postCollection.add({
          title: this.postTitle,
          body: this.postBody,
          author: this.af.app.auth().currentUser.email, // specify that the author is the email of the user
          imgUrl: uploadImageUrl // here program send the URL to picture we just uploaded with the post. So we can show it up the "feed"
        } as Post).then(() => {
          // When the picture is uploaded we are in .then and can dismiss the loading screen
          this.toast.create({
            message: "Done posting",
            duration: 2500
          }).present();
        })
      });


  }

 

}
