import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public user = {
    username: "",
    password: ""
  }


  constructor(public navCtrl: NavController, public navParams: NavParams, private af: AngularFirestore, private loadingCtrl: LoadingController, private alertCtrl: AlertController, private toast: ToastController) {
  }
  
  // Login
  loginUser() {
    let loading = this.loadingCtrl.create({ content: "Logger inn..."});
    loading.present();

  this.af.app.auth()
    .signInWithEmailAndPassword(this.user.username, this.user.password)
    .then(response => {
      console.log(response);
      loading.dismiss();
          // Toast melding som sier ifra at du er logget inn og navnet på brukerkontoen.
          this.toast.create({
            message: "Du er logget inn som " + this.user.username,
            duration: 2500 // varer i 2500 ms før den går vekk
          }).present();
    })
    .catch(error => {
    console.error(error);
    loading.dismiss();
    // Feilmelding som sier ifra hva som er feil ved innlogging. Personalisert så du får vite hva som var feil. Bruker alert så brukeren kan ha tid til å lese feilmeldingen og trykke videre på egenhånd
    let alert = this.alertCtrl.create({
      title: 'Feil ved innlogging',
      subTitle: error,
      buttons: ['Lukk melding']
    });
    alert.present();
  })
}

  // Register
  registerUser() {
    let loading = this.loadingCtrl.create({ content: "Registrerer..."});
    loading.present();

    this.af.app.auth()
      .createUserWithEmailAndPassword(this.user.username, this.user.password)
      .then(response => {
        console.log(response);
        loading.dismiss();
      })
      .catch(error => {
        console.error(error);
        loading.dismiss();
        // Feilmelding som sier ifra hva som er feil ved registering. Personalisert så du får vite hva som var feil.
        let alert = this.alertCtrl.create({
          title: 'Feil ved registrering',
          subTitle: error,
          buttons: ['Lukk melding']
        });
        alert.present();
      })
  }

}
