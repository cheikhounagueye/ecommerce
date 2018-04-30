import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, Slides, ToastController } from 'ionic-angular';
import {ProductDetailsPage} from '../product-details/product-details'

import * as WC from 'woocommerce-api';
//import { JsonPipe } from '@angular/common';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  WooCommerce: any;
  products: any[];
  moreProducts: any[];
  page: number;

  @ViewChild('productSlides') productSlides: Slides;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {
this.page = 2;

    this.WooCommerce = WC({
      url: "http://www.sentoubagroup.com",
     consumerKey: "ck_00e6818746b3df14e8fea155443d23f31a36a2d7",
      consumerSecret: "cs_11081baa2c245f774a941692e13b4a0f9b42b278"
    });
  
    this.loadMoreProducts(null);
    this.WooCommerce.getAsync("products").then( (data)=> {
      console.log(JSON.parse(data.body));
      this.products = JSON.parse(data.body).products;
    }, (err)=>{
console.log(err)
    })
  }

  ionViewDidLoad(){
    
    setInterval(() => {

if(this.productSlides.getActiveIndex() == this.productSlides.length() -1)
this.productSlides.slideTo(0);

    }, 3000)
  }

  loadMoreProducts(event)
  {
     if(event == null){
      this.page = 2;
     this.moreProducts = [];
     }
     else
     this.page= this.page++;

    this.WooCommerce.getAsync("products?page="+this.page).then( (data)=> {
      console.log(JSON.parse(data.body));
      this.moreProducts = this.moreProducts.concat(JSON.parse(data.body).products);

      if(event !=null)
      {
        event.complete();
      }

      if(JSON.parse(data.body).products.length < 5){
        event.enable(false);
        this.toastCtrl.create({
          message: "no more products",
          duration: 5000
        }).present();
      }
    }, (err)=>{
     
console.log(err)
    })
  }

  openProductPage(product){
    this.navCtrl.push(ProductDetailsPage,{"product": product});
  }

}