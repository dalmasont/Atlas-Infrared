import { Component } from '@angular/core';
import { Platform} from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { NativeStorage } from '@ionic-native/native-storage';

import {global} from '../../app/global';

import { ThermoPage } from '../thermo/thermo';

@Component({
  providers: [SocialSharing],
  selector: 'page-show',
  templateUrl: 'show.html'
})
export class ShowPage {

  public key : String;
  public nameKey : String;
  public images: string[];
  public socialSharing: SocialSharing;

  private fav: string = "off";

  favs = [];

  constructor(public navCtrl: NavController, public params: NavParams, private ss: SocialSharing, private nativeStorage: NativeStorage, private plt: Platform, private alertCtrl: AlertController) {
    this.key = params.get("key");
    this.nameKey = params.get("nameKey").toUpperCase();
    this.nativeStorage = nativeStorage;
    this.plt = plt;

    this.socialSharing = ss;

    //
    var imgs = [];
    var images = global.imgs[this.key.toString()];
    if(!images){
      images = 1;
    }
    for(var i = 1; i <= images; i ++){
      imgs.push("./assets/conteudo/bd/" +this.key+ "/img" +i+ ".jpg");
    }
    this.images = imgs;
  }

  back(){
    this.navCtrl.pop();
  }

  share(){
    if(this.plt.is("ios")){
      this.socialSharing.share("Estou usando o aplicativo InfraredMed Atlas para consultas medicas, baixe também.", "InfraredMed Atlas para consultas medicas", "", "https://itunes.apple.com/us/app/infraredmed-atlas/id1232481936?ls=1&mt=8");
    }else{
      this.socialSharing.share("Estou usando o aplicativo InfraredMed Atlas para consultas medicas, baixe também.", "InfraredMed Atlas para consultas medicas", "", "https://play.google.com/store/apps/details?id=com.infraredmed.atlas");
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrivadoComunidadeAdd');
    this.plt.ready().then((readySource) => {
      this.nativeStorage.getItem('favs').then(
      (data) => {
        console.log('Stored item!');
        this.favs = data;
        if(this.favs.indexOf(this.key) != -1){
          this.fav = "on";
        }
      },
      error => {
        console.log("Erro: " + error);
      });
    });

    //
    this.nativeStorage.getItem('mensagemTermica').then(
    (data) => {
      console.log('Stored item!');
    },
    error => {
      console.log("Erro: " + error);
      this.showMensagem();
      this.nativeStorage.setItem('mensagemTermica', true);
    });
  }

  showMensagem(){
    //
    let alert = this.alertCtrl.create({
      title: 'Clique na imagem para ver as ferramentas de análise de imagem térmica!',
      buttons: ['Ok, entendi!']
    });
    alert.present();
  }

  favorite(){
    if(this.fav == "on"){
      this.fav = "off";
      this.favs.splice(this.favs.indexOf(this.key), 1);
    }else{
      this.fav = "on";
      this.favs.push(this.key);
    }
    this.nativeStorage.setItem("favs", this.favs);
    console.log("Favorito: " + this.key);
  }

  show_termo(image_url){
    var urlInicial = image_url.split("/");
    var folderName = urlInicial[urlInicial.length-2];
    var imageName = urlInicial[urlInicial.length-1];
    this.navCtrl.push(ThermoPage, {
      folderName: folderName,
      imageName: imageName.replace(".jpg", ""),
      nameKey: this.nameKey
    }, { animate: true, direction: 'forward', animation: 'md-transition'});
  }
}
