import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import {global} from '../../app/global';

@Component({
  selector: 'page-thermo',
  templateUrl: 'thermo.html'
})
export class ThermoPage {

  public vm = {};
  imageName;
  folderName;
  nameKey;

  currentMinTemp;
  currentMaxTemp;

  pallets = "Arctic";

  timeDraw;

  constructor(public navCtrl: NavController, public params: NavParams, public http: Http, private alertCtrl: AlertController) {
    console.log("ThermoPage - start");
    this.imageName = params.get("imageName");
    this.folderName = params.get("folderName");
    this.nameKey = params.get("nameKey");

    //
    this.vm['test'] = 'testController';
    this.vm['pallete'] = {};
    this.vm['image'] = {};
    this.vm['minTemp'] = 0;
    this.vm['maxTemp'] = 0;
    console.log(this.vm);
  }

  ionViewDidLoad() {
    this.loadFilter();
    this.loadAtlas();
  }

  loadFilter(){
    console.log("./assets/conteudo/pallets/" + this.pallets + ".txt");
    this.http.get("./assets/conteudo/pallets/" + this.pallets + ".txt").subscribe(data => {
      console.log(data.json());
      this.vm['pallete'] = data.json();
      this.draw();
    }, error => {console.log("Error: " + JSON.stringify(error));});
  }

  loadAtlas(){
    // console.log(this.folderName+ "/" +this.imageName+ ".json");
    this.http.post("http://infraredmed.com/app_atlas/bd/readJson.php", {
      json_url: this.folderName+ "/" +this.imageName+ ".json"
    }).subscribe(data2 => {
      if(data2.json() != "false"){
        // console.log(data2.json());
        this.vm['image'] = data2.json();
        this.vm['minTemp'] = data2.json().minTemp * 100;
        this.vm['maxTemp'] = data2.json().maxTemp * 100;

        this.currentMinTemp = this.vm['minTemp'];
        this.currentMaxTemp = this.vm['maxTemp'];
        this.draw();
      }else{
        this.back();
        let alert = this.alertCtrl.create({
          title: 'Imagem não radiometrica',
          buttons: ['Entendi']
        });
        alert.present();
      }
    }, error2 => {
      console.log("Error: " + JSON.stringify(error2));
    });
  }

  minTempRange(event){
    // console.log(event.value);
    this.currentMinTemp = event.value;
    clearInterval(this.timeDraw);
    this.timeDraw = setTimeout(() => {this.draw();}, 100);
  }

  maxTempRange(event){
    // console.log(event.value);
    this.currentMaxTemp = event.value;
    clearInterval(this.timeDraw);
    this.timeDraw = setTimeout(() => {this.draw();}, 100);
  }

  atlasChange(value){
    console.log(value);
    this.pallets = value;
    this.loadFilter();
  }

  draw(){

    if(!this.currentMinTemp || !this.currentMaxTemp){
      return;
    }
    console.log("Draw!");
    //
    var element = document.getElementById("sketch");

    //
    var canvas = <HTMLCanvasElement>document.getElementById("canvasId");
    var ctx = canvas.getContext("2d");

    // element.appendChild(canvas);

    var image = this.vm['image'];

    element.style.height = image.height;
    element.style.width = image.width;

    canvas.width = image.width;
    canvas.height = image.height;

    var imgData = ctx.createImageData(image.width, image.height);

    //
    var size = this.vm['pallete'].colors.length-1;
    var delta = (this.currentMinTemp/100) - (this.currentMaxTemp/100);
    var a = -size / delta;
    var b = size * (this.currentMinTemp/100) / delta;

    //
    var i = 0;
    for (var row = 0; row < image.height; row++) {
        for (var col = 0; col < imgData.width; col++) {

            var temperature = image.temperatureArray[row][col];

            var rgb;
            if (temperature < (this.currentMinTemp/100)) {
                rgb = this.vm['pallete'].colors[0];
            } else if (temperature >= (this.currentMaxTemp/100)) {
                rgb = this.vm['pallete'].colors[size];
            } else {
                var rgbIndex = Math.round((temperature * a + b));
                rgb = this.vm['pallete'].colors[rgbIndex];
            }

            imgData.data[i++] = rgb[0];
            imgData.data[i++] = rgb[1];
            imgData.data[i++] = rgb[2];
            imgData.data[i++] = 255;
        }
    }
    ctx.putImageData(imgData, 0, 0);

    console.log(element);
  }

  back(){
    this.navCtrl.pop({animation: 'md-transition'});
  }
}
