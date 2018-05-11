import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { User } from '../../models/User';

import { Observable } from 'rxjs/Observable';

/*
  Generated class for the AuthorizeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.

  Uferdig kode for en fremtidlig funksjonalitet. Kan se litt av tankegangen av hva jeg hadde planlagt. 
  Bruke UID fra Authentication for å koble det opp en field i dokumentet 'user' fra collection 'users'. 
  Deretter populere data i dokumentet med ting som nummer, navn, og alt annet som kunne vært ønskelig for kontakte personen og lignende.
  Ble aldri ferdig med det men her er noe av koden.
*/
@Injectable()
export class AuthorizeProvider {
  public collection: AngularFirestoreCollection<User>;
  public users: Observable<User[]>;

    // Deklarerer variabler som vi skal ta i bruk
    public userID: string = ""; 
    public userName: string = ""; 
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
            ...data  // Spread opderator, pakker ut objektet med metadata (ID) og data (fields)
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
