import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { MyPostsPage } from '../pages/my-posts/my-posts';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = HomePage;
  rootPage: any = HomePage;
  // Import from child since MyApp doesn't have it's own NavController
  @ViewChild(Nav) nav: Nav;

  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, af: AngularFirestore) {

    /*
    const authObserver = af.app.auth().onAuthStateChanged(
      (user) => {

        if (user) {
          this.rootPage = HomePage;
        } else {
          this.rootPage = 'LoginPage';
        }
      }
    )
    */
    // List of pages that can be navigated to
    this.pages = [
      { title: 'Hjem / annonser', component: HomePage },
      { title: 'Mine annonser', component: MyPostsPage}
    ];




    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }

  openPage(page){
   // this.navCtrl.push(homePage)
    this.nav.setRoot(page.component);
  }
}

