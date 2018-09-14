import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {global} from '../../app/global';
import {ShowPage} from '../show/show';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  public items: string[];
  private alertCtrl : AlertController;

  constructor(public navCtrl: NavController, public params: NavParams, private alertC: AlertController) {
    this.initializeItems();
    this.alertCtrl = alertC;
  }

  back(){
    this.navCtrl.pop();
  }

  initializeItems() {
    var keys = [];
    for(var gk in global.dados) {
      var dict = global.dados[gk];
      var index = 0;
      for(var k in dict) {
        if(index < 2){
          keys.push([k, dict[k], "Free"]);
        }else{
          keys.push([k, dict[k], global.versao]);
        }
        index += 1;
      }
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
              console.log('Ir para o app. (Colocar a URL)');
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

  cancel(){
    this.navCtrl.pop({animate: false});
  }
}
