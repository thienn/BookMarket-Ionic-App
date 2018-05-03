import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthorizeProvider } from '../../providers/authorize/authorize';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  
  loginUser() {
    this.loginUser();
  }

  registerUser() {
    this.registerUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
