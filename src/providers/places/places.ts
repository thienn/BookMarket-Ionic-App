import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PlacesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.

  Kode lånt fra Andreas Biørn-Hansen - https://github.com/andreasbhansen/TDS200_v18/blob/master/lecture_7/oving_lecture_7/src/providers/places/places.ts
  og teori fra https://developers.google.com/maps/documentation/geolocation/intro
*/
@Injectable()
export class PlacesProvider {

  private GOOGLE_GEOCODE_API_KEY: string = ""; // Implement later

  constructor(public http: HttpClient) {
    console.log('Hello PlacesProvider Provider');
  }

  // Using this feature to get geographical placement based on the latitude and longitude we collected
  getPlaceBasedOnLatLng(lat, lng) {
    return new Promise((resolve, reject) => {
      this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&key=${this.GOOGLE_GEOCODE_API_KEY}`)
      .subscribe(
        function (data) {
          // data is the Google Geocode content that keep our address / location
          resolve(data)
        },
        function (error) {
          // If anything goes wrong then send a error message
          reject(error)
        }
      );
    });
  }
}
