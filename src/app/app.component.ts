import { Component } from '@angular/core';
import { Platform/*, MenuController*/ } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native';

import { HomePage } from '../pages/home/home';
import { TestPage } from '../pages/test/test';
import { SearchPage } from '../pages/search/search';
import { ShowPage } from '../pages/show/show';

import { ThermoPage } from '../pages/thermo/thermo';

import { Fav } from '../pages/fav/fav';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  pages: Array<{ component: any, title: string, icon: string}>;
  rootPage:any = HomePage;
  platform: Platform;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen/*, private menuCtrl: MenuController*/) {

    this.pages = [
      {component : HomePage, title: 'Inicio', icon: 'iconHome'},
      {component : Fav, title: 'Favoritos', icon: 'iconStarOn'}
    ];

    this.platform = platform;

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page: any) : void{
    this.rootPage = page.component;
  }

  openLink(url: string){
    window.open(url, '_system');
  }
}
