import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import {global} from '../../app/global';
import {ShowPage} from '../show/show';
import 'rxjs/Rx';

@Component({
  selector: 'page-findClinicas',
  templateUrl: 'findClinicas.html'
})
export class FindClinicas {

  public items: string[];
  private objs = [];

  private alertCtrl : AlertController;

  private platform : Platform;

  constructor(public navCtrl: NavController, public params: NavParams, private alertC: AlertController, public plt: Platform, private http: Http) {
    this.http = http;
    this.alertCtrl = alertC;
    this.platform = plt;
  }

  ionViewDidLoad() {
    this.loadItems();
  }

  back(){
    this.navCtrl.pop();
  }

  loadItems(){
    this.http.get("http://infraredmed.com/app_codes/busca_clinicas.php").subscribe(data => {
      console.log(data.json().data.node);
      this.objs = data.json().data.node;
      this.initializeItems();
    }, error => {
      console.log("Error: " + JSON.stringify(error.json()));
    });
  }

  initializeItems() {

    var keys = [];
    this.objs.forEach(function(entry) {
      console.log(entry);
      keys.push([entry.cli_titulo, entry.cli_texto, entry.lc_nome, entry.le_uf, entry.cli_telefone, entry.cli_responsavel_tecnico]);
    });
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
