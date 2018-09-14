import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TestPage } from '../test/test';
import {SearchPage} from '../search/search';

import {FindClinicas} from '../findClinicas/findClinicas';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  openList(page: any, pageName: String) : void{
    this.navCtrl.push(TestPage, {
      currentPage: page,
      currentPageName: pageName
    }, { animate: true, direction: 'forward' });
  }

  startSearch(){
    this.navCtrl.push(SearchPage, {}, { animate: false, direction: 'forward' });
  }

  findClinicas(){
    this.navCtrl.push(FindClinicas, {}, { animate: false, direction: 'forward' });
  }

}
