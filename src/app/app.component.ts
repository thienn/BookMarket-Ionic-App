import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { MyPostsPage } from '../pages/my-posts/my-posts';
import { AngularFirestore } from 'angularfire2/firestore';
import { UserProfilePage } from '../pages/user-profile/user-profile';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;
  // Importerer Nav fra 'child' siden MyApp(root) kan ikke injectecte det som de andre, grunnet komponenter relatert til NavController er children av root komponentet.
  // Kilde om root og ViewChild - https://ionicframework.com/docs/api/navigation/NavController/#navigating-from-the-root-component
  @ViewChild(Nav) nav: Nav;

  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, af: AngularFirestore) {
    const authObserver = af.app.auth().onAuthStateChanged(
      (user) => {

        if (user) {
          this.rootPage = HomePage;
        } else {
          this.rootPage = 'LoginPage';
        }
      }
    )
    
    // Array-liste som genererer side menyen, med link til siden. + (Lukk meny på slutten i app.HTML som er utenfor array, så den alltid er på slutten og konstant)
    this.pages = [
      { title: 'Hjem / annonser', component: HomePage },
      { title: 'Mine annonser', component: MyPostsPage},
      { title: 'Brukerprofil', component: UserProfilePage}
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }

  // Setter page til root / sender til page basert på hva den får inn fra array
  openPage(page){
   // this.nav.push(page.component) - Push Pop
    this.nav.setRoot(page.component); // Setter root, så du ikke kan gå tilbake med tilbake-knappen. I forhold til push pop hvor du har history av hva som er i stacken
  }
}

