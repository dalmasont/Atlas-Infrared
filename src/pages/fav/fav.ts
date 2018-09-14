import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NativeStorage } from '@ionic-native/native-storage';

import {global} from '../../app/global';

import {ShowPage} from '../show/show';

@Component({
  selector: 'page-fav',
  templateUrl: 'fav.html',
})
export class Fav {

  public items: string[];

  favs = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeStorage: NativeStorage) {
    this.nativeStorage = nativeStorage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Fav');
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter Fav');
    this.initializeItems()
  }

  initializeItems() {
    this.nativeStorage.getItem('favs').then(
    (data) => {
      console.log('Stored item!');
      this.favs = data;

      var keys = [];
      for(var gk in global.dados) {
        var dict = global.dados[gk];
        var index = 0;
        for(var k in dict) {
          if(this.favs.indexOf(dict[k]) != -1){
            keys.push([k, dict[k], "Free"]);
          }
          index += 1;
        }
      }
      this.items = keys;
    },
    error => {
      console.log("Erro: " + error);
    });
  }

  clickItem(myKey, myNameKey, plano){
    this.navCtrl.push(ShowPage, {
      key: myKey,
      nameKey: myNameKey
    }, { animate: true, direction: 'forward' });
  }
}
