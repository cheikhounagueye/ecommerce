import { Component } from '@angular/core';
import {  NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import {Storage} from '@ionic/storage';
import {Cart } from '../cart/cart';



@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage
 {

  product: any;
  WooCommerce: any;
  reviews: any[]= [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage,
  public toastCtrl:ToastController, public modelCtrl:ModalController) {
    this.product = this.navParams.get("product");
    console.log(this.product);

    this.WooCommerce = WC({
      url: "http://www.sentoubagroup.com",
     consumerKey: "ck_00e6818746b3df14e8fea155443d23f31a36a2d7",
      consumerSecret: "cs_11081baa2c245f774a941692e13b4a0f9b42b278"
    });
    
    this.WooCommerce.getAsync('products/'+ this.product.id +'/reviews').
    then((data) =>{
  this.reviews = JSON.parse(data.body).product_reviews;
  console.log(this.reviews);


    },(err)=>{
console.log(err);
    })
  }


  addTocart(product){
    this.storage.get("cart").then((data) =>{
      if(data == null || data.length ==0){

        data = [];

        data.push({
          "product": product,
          "qty": 1,
          "amount" : parseFloat(product.price)
        });
      }else{
        let added = 0;
        for(let i=0; i<data.length; i++){

          if(product.id == data[i].product.id){
            console.log("produit deja ajouté dans le panier");
            let qty= data[i].qty;
            data[i].qty = qty+1
            data[i].amount = parseFloat(data[i].amount) + parseFloat(data[i].product.price);
            added = 1;
          }

          if(added == 0){
            data.push({
              "product": product,
              "qty": 1,
              "amount" : parseFloat(product.price)
            });
          }

        }
      }
this.storage.set("cart", data).then(()=>{
  console.log("panier mis à jour")
  console.log(data);

  this.toastCtrl.create({
    message: "panier mis à jour",
    duration: 3000
  }).present()
});

    });
  }

  openCart(){
    this.modelCtrl.create(Cart).present();
  }
}
