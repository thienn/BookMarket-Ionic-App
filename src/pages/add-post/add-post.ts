import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';

import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

import { Post } from '../../models/Post';
import { PlacesProvider } from '../../providers/places/places';


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

  // Tomme placeholder objekt som vil få inn data for å sende til Firebase
  public postTitle: string = "";
  public postBody: string = "";
  public postPrice: string = "";
  private previewImage: string = "";

  public location: { latitude: number, longitude: number } = { latitude: 0, longitude: 0 }; //Basis objekt for location før de får inn de ekte koordinatene
  private placeAddress: string = "";

  loading: boolean; // Loading boolean for å vise fram når den blir kalt på i koden.


  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, private camera: Camera, private afStorage: AngularFireStorage, private af: AngularFirestore,
    private geolocation: Geolocation, private placesProvider: PlacesProvider, private loadingCtrl: LoadingController) {
    // Siden vi sender med collection fra Home allerede, trenger vi ikke å sette opp alt igjen, trenger bare å si ifra at det er den for å ta i bruk og koble de sammen.
    this.postCollection = navParams.get('postCollection');
  }

  addPost() {

    // Setter opp en loading pop up mens alt blir jobbet i bakgrunnen, så bruker vet hva som skjer.
    let loading = this.loadingCtrl.create({ content: "Lagrer post..." });
    loading.present();

    /*
       Genererer et filnavn for bildet vi skal laste opp til Firebase Storage, basert på innlogget email(brukernavn) med sekunder i UNIX telefonen's tid (1.1.1970)
    */
    let imageFileName = `${this.af.firestore.app.auth().currentUser.email}_${new Date().getTime()}.png`;

    // Lager en oppgave om å laste de topp til firebase storage. 
    let task = this.afStorage
      .ref(imageFileName) // Spesifiserer til filnavnet vi laget før dette som navn
      .putString(this.previewImage, 'base64', { contentType: 'image/png' }); // Laster opp bilde vi tok med knappen med base64 format - hvis det ikke er noe bilde tatt, så laster den opp noe tomt(finne ut av dette senere) med filnavnet

    // Lager en event som skal vente på at downloadURL fra firestore Storage er klar, dermed gå videre
    let uploadEvent = task.downloadURL();

    // Her venter den inntil opplastningen er ferdig gjennom subscribe, deretter går den gjennom prosessen vi har lagt til som er å legge til et post
    uploadEvent.subscribe((uploadImageUrl) => {
      console.log(uploadImageUrl) // Logger link ut på console for testing - debug
      this.postCollection.add({
        title: this.postTitle, // Titel på posten 
        body: this.postBody, // Teksten som skal være med i posten
        price: this.postPrice, // Pris hvis det blir lagt til - null om det ikke er noe
        placeAddress: this.placeAddress, // Område basert på findGeolocation - Satt til bydel akkurat nå
        author: this.af.app.auth().currentUser.email, // Spesifiserer at det er innlogget bruker's email som skal være author
        imgUrl: uploadImageUrl, // Spesifiserer at downloadURL vi fikk tidiligere er den som skal kobles til i field "imgUrl" i posten. Så den automatisk viser fram.
      } as Post).then(() => {

        loading.dismiss();
        // Resetter alle input-fields, så bruker kan laste opp noe annet etter det er ferdig.
        this.postTitle = "";
        this.postBody = "";
        this.postPrice = "";
        this.previewImage = "";
        this.placeAddress = "";

        // Lager en toast melding som sier ifra at det er ferdig - Ikke nødvendig men ekstra bare for å gjøre det mer brukervennlig
        this.toast.create({
          message: "Annonsen er postet!",
          duration: 2500
        }).present();
      })
    });
  }

  executeCamera() {
    // Standard spesifikasjoner for å starte opp kamera samt type det skal være.
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      cameraDirection: this.camera.Direction.BACK,
      correctOrientation: true
    })
      .then(imgBase64 => {
        // Når det er lagt opp, setter vi previewImage til det samme som bildet, så det kan bli visuelt vist fram.
        // HTML-en tar seg av å at previewImage bare er 300px og ikke hele bildet i størrelse.
        this.previewImage = imgBase64;
      });
  }

  findGeolocation() {

    this.loading = true; // Siden denne prosessen noen ganger kan ta fra 2-3 sekunder til mye lengre tid, så trenger vi en loading spinner som kjører mens det blir gjort i bakgrunnen.

    // Kaller på native plugin for geolocation
    this.geolocation.getCurrentPosition({
      enableHighAccuracy: false // true gjør at den i noen tilfeller er treigt
    })

      .then(location => {
        /*
          "location" - få tilbake objektet "coords"-objektet. Denne innholder alle data vi får fra metoden, deretter henter vi ut spesifikt latitude og longitude derfra og kobler opp til vår variabler
        */

        this.location.latitude = location.coords.latitude;
        this.location.longitude = location.coords.longitude;

        // Etter at vi har fått inn latitude & longitude, kan vi bruke dette til å finne ut område ved hjelp av placesProvider som kobler seg til Google's Geocoding
        this.placesProvider.getPlaceBasedOnLatLng(location.coords.latitude, location.coords.longitude)
          .then((place: any) => {
            // Hvis det er noe feil fra vår eller deres side så send tilbake melding på console
            if (place.error_message) {
              console.log(place.error_message)
            } else {

              /* Når vi får tilbake objektet fra Google's geocode, gjennom en "formatted_address"-objekt. Med array av detaljer vi kan ta i bruk. 
                Array index 0 er f.eks full addresse, 1 er gate, deretter 2 er bydel og postnummer ov videre. Mindre og mindre nøyaktighet jo lengre ned i det du går.
                Teori fra - https://developers.google.com/maps/documentation/geocoding/intro#reverse-example Med forklaring av formatted_address
                I vår eksempel har vi lyst å bruke bydel som default, Grunerløkka, Oslo, Norway / Stovner, Oslo, Norway osv. Så det ikke blir "For nøyaktig for offentlig informasjon"
              */
              this.loading = false; // Hvis vi ikke får en feilmelding og data fra objektet er klar til å presenteres slår vi av loading spinner
              this.placeAddress = place.results[2].formatted_address; // Forklart i paragraf over
            }
          });

      })
      .catch(error => {
        console.error(error)
      });
  }
}
