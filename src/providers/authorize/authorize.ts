import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';

/*
  Generated class for the AuthorizeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthorizeProvider {

  public user = {
    username: "",
    password: ""
  }

  constructor(public http: HttpClient, private af: AngularFirestore) {
    console.log('Hello AuthorizeProvider Provider');
  }

  // Similar setup on both, just using different call. Try / catch method for success & error if something goes wrong. Rest is handled by the Firestore module

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


}
