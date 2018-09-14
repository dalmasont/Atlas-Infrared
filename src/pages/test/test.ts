import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import {global} from '../../app/global';
import {ShowPage} from '../show/show';

@Component({
  selector: 'page-test',
  templateUrl: 'test.html'
})
export class TestPage {

  public currentPage: String;
  public currentPageName: String;
  public items: string[];

  private alertCtrl : AlertController;

  private platform : Platform;

  constructor(public navCtrl: NavController, public params: NavParams, private alertC: AlertController, public plt: Platform) {
    this.currentPage = params.get("currentPage");
    this.currentPageName = params.get("currentPageName");
    this.initializeItems();
    this.alertCtrl = alertC;
    this.platform = plt;
  }

  back(){
    this.navCtrl.pop();
  }

  initializeItems() {
    var dict = global.dados[this.currentPage.toString()];
    var keys = [];
    var index = 0;
    for(var k in dict) {
      if(index < 2){
        keys.push([k, dict[k], "Free"]);
      }else{
        keys.push([k, dict[k], global.versao]);
      }
      index += 1;
    }
    this.items = keys;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item[0].toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  clickItem(myKey, myNameKey, plano){
    if(plano == "Pago"){
      let alert = this.alertCtrl.create({
        title: 'Adquira a versão premium do Atlas',
        message: 'Tenha acesso a mais de 400 imagens térmicas do corpo humano, com diversas doenças para consulta educacional e treinamento médico.',
        buttons: [
          {
            text: 'Agora não',
            role: 'cancel',
            handler: () => {
              console.log('Cancelou');
            }
          },
          {
            text: 'Quero baixar',
            handler: () => {
              if(this.platform.is("ios")){
                window.open("https://itunes.apple.com/us/app/infraredmed-atlas/id1232481936?ls=1&mt=8", '_system');
              }else{
                window.open("https://play.google.com/store/apps/details?id=com.infraredmed.atlas", '_system');
              }
            }
          }
        ]
      });
      alert.present();
      return;
    }
    this.navCtrl.push(ShowPage, {
      key: myKey,
      nameKey: myNameKey
    }, { animate: true, direction: 'forward' });
  }
}
