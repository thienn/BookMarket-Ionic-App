import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { Post } from '../../models/Post';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
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

  // Deklarerer variabler som skal brukes til under prosessen
  public postTitle: string = ""; 
  public postBody: string = ""; 
  public postPrice: string = null; 


  constructor(public navCtrl: NavController, public navParams: NavParams, private afs: AngularFirestore,
  private toast: ToastController, private loadingCtrl: LoadingController) {
    // Får sendt inn spesfikt post fra my-posts. Som sier ifra hvilken det er vi modifiserer
    this.post = navParams.get('post');
    // Vi setter opp collection for 'posts' på nytt ettersom det er bedre praksis enn å sende over hele collection med navigation. I constructor har det ikke så mye å si hvilken rekkefølge, men Collection i teorien kommer først
    this.postCollection = afs.collection<Post>("posts"); 

    // Eksempel på console logging for å se om riktig data var sendt inn
    console.log(this.post.title);
    console.log(this.post.id);

    // Nå som vi er koblet til post, så populerer vi det med data fra post som ble sendt over, så brukeren ser hva som er i de forskjellige fields og hva det er de forandrer om det er noe der
    // Bare for tittel, tekst og pris. 
    /* TO:DO Planen er å få det til fullt med bilder, geolocation osv senere. Refaktorere det med praksis DRY - så vi ikke bruker akkurat samme metode i både add-post og manage-post
     Heller kalle på det gjennom provider.
     */
    this.postTitle = this.post.title;
    this.postBody = this.post.body; 
    this.postPrice = this.post.price;


  }

  updatePost() {
    
    // Testing for å se om vi har riktig post.id
    console.log(this.post.id);

    let loading = this.loadingCtrl.create({ content: "Oppdaterer post..."});
    loading.present();

    /* Kaller på update metoden og spesifiserer til denne posten via ID. Deretter oppdaterer vi data i fields som ble sendt inn. 
      Hvis det ikke har forandret seg så får den inn det som var der før, hvis det er nytt så får den inn nytt data det som ble nylig skrevet inn i de forskjellige input fields.
    */
    this.postCollection.doc(this.post.id).update({
      title: this.postTitle,
      body: this.postBody,
      price: this.postPrice
    } as Post).then((response) => {
      // pop up(toast) melding som sier ifra når det er ferdig
      this.toast.create({
        message: "Annonsen er oppdatert",
        duration: 2500 // varer i 2500 ms før den går vekk
      }).present();
      // Gå ut av loading skjerm når det er ferdig.
      loading.dismiss();
      // navigerer tilbake til forrige side i Push-Pop-stacken (liste over annonser)
      this.navCtrl.pop();
    })
    .catch(error => {
      // Feilmelding om noe går galt, deretter går den tilbake til forrige side i stacken (liste over annonser)
      this.toast.create({
        message: error.message,
        duration: 2500
      }).present();
      this.navCtrl.pop();
    })
  }

  deletePost() {
    // Testing for å se om vi har riktig post.id
    console.log(this.post.id);

    // Enkel metode som finner fram til postID vi ser på nå, deretter kaller den på metoden for å slette hele dokumentet basert på posten's unike ID
    this.postCollection.doc(this.post.id).delete()
      .then((response) => {
        this.toast.create({
          message: "Annonsen er slettet" + this.post.title, // Med tittel på annonsen som ble slettet
          duration: 2500
        }).present();
        // Sender tilbake til forrige side i stacken (skal være liste over annonser)
        console.log("deleted post")
        this.navCtrl.pop();
      })
      .catch(error => {
        this.toast.create({
          message: error.message,
          duration: 2500
        }).present();
        this.navCtrl.pop();
      })
  }

}
