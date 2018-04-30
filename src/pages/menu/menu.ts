import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from '../home/home';
import * as WC from 'woocommerce-api';
import {ProductsByCategoryPage} from '../products-by-category/products-by-category'




@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class Menu {
homePage: any;
WooCommerce: any;
categories: any[];
@ViewChild('content') childNavCtrl: NavController;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.homePage = HomePage;
    this.categories = [];
    this.WooCommerce = WC({
      url: "http://www.sentoubagroup.com",
      consumerKey: "ck_00e6818746b3df14e8fea155443d23f31a36a2d7",
      consumerSecret: "cs_11081baa2c245f774a941692e13b4a0f9b42b278"
    });

    this.WooCommerce.getAsync("products/categories").then(
       (data)=>{
      console.log(JSON.parse(data.body).product_categories);

      let temp: any[] = JSON.parse(data.body).product_categories;

      for(let i=0; i<temp.length; i++){
        if(temp[i].parent == 0){
          this.categories.push(temp[i]);
        }
        if(temp[i].slug=="accessories"){
          temp[i].icon = "appstore"
        }

        if(temp[i].slug=="hoodies"){
          temp[i].icon = "car"
        }

        if(temp[i].slug == "tshirts"){
          temp[i].icon = "shirt"
        }

        if(temp[i].slug == "non-classe"){
          temp[i].icon = "watch"
        }

    

      
      }

    }, (err)=>{

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  openCategoryPage(category){
    this.childNavCtrl.setRoot(ProductsByCategoryPage,{"category": category});
  }

}
