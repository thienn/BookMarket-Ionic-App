import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthorizeProvider } from '../../providers/authorize/authorize';
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


  constructor(public navCtrl: NavController, public navParams: NavParams, private af: AngularFirestore) {
  }
  
  // Login
  loginUser() {
    this.af.app.auth()
    .signInWithEmailAndPassword(this.user.username, this.user.password)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    })
  }

  // Register
  registerUser() {
    this.af.app.auth()
      .createUserWithEmailAndPassword(this.user.username, this.user.password)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
