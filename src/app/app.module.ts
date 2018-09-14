import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { NativeStorage } from '@ionic-native/native-storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TestPage } from '../pages/test/test';
import { SearchPage } from '../pages/search/search';
import { ShowPage } from '../pages/show/show';
import { ThermoPage } from '../pages/thermo/thermo';

import { Fav } from '../pages/fav/fav';
import { FindClinicas } from '../pages/findClinicas/findClinicas';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TestPage,
    SearchPage,
    ShowPage,
    Fav,
    FindClinicas,
    ThermoPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TestPage,
    SearchPage,
    ShowPage,
    Fav,
    FindClinicas,
    ThermoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
