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
    // Kobler opp til post vi fikk fra HomePage, og til postCollection vi fikk derfra.
    this.post = navParams.get('post');
    this.postCollection = navParams.get('postCollection');

    // Til å vise fram kommenterarer fra subcollection "comments" basert på post ID som vi fikk sendt fra forrige side. Og sier ifra at det er "comments" vi ser på
    this.comments = this.postCollection
      .doc(this.post.id)
      .collection("comments")
      .valueChanges();
  }

  // Legg til kommentar med text fra commentText, spesifiserer at det skal legges til subcollection "comments" under spesifikk post basert på Post.ID
  addComment() {
    this.postCollection
      .doc(this.post.id)
      .collection("comments")
      .add({
        comment: this.commentText
      })
      .then(() => {
        // Resetter kommentarfelt når det er postet
        this.commentText = "";
      })
  }  

}
