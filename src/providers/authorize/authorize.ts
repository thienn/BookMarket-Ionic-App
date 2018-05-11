import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { User } from '../../models/User';

import { Observable } from 'rxjs/Observable';

/*
  Generated class for the AuthorizeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthorizeProvider {
  public collection: AngularFirestoreCollection<User>;
  public users: Observable<User[]>;

    // Define variables to use, empty until connected to post 
    public userID: string = ""; //Empty placeholder that will be the string that get sent to Firebase as title of post
    public userName: string = ""; //Empty placeholder that will be the string that get sent to Firebase as content of post (body)
    public userNumber: number = 0;

  public user = {
    username: "",
    password: ""
  }

  /*
  constructor(public http: HttpClient, private af: AngularFirestore) {
    this.collection = af.collection<User>("users"); // Specifies the collection called posts in the DB

    this.users = this.collection.snapshotChanges() // for realtime looking for changes in that collection
      .map(actions => {
        return actions.map(action => {
          let data = action.payload.doc.data() as User;
          let id = action.payload.doc.id;

          return {
            id,
            ...data  // Spread operator, packs out the data in the object & returns it with metadata (ID) and the data (fields) in the post
          };
        })
      });

  }
  */
  /*
  createProfile(userID, userName, userNumber) {
    this.collection.doc(this.userID).update({
      userID: this.userID,
      userName: this.userName,
      userNumber: this.userNumber
    } as User).then((response) => {
      // pop up(toast) melding som sier ifra


    })
  } 
  */

}
