import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import {ProductDetailsPage} from '../product-details/product-details';


@Component({
  selector: 'page-products-by-category',
  templateUrl: 'products-by-category.html',
})
export class ProductsByCategoryPage {

  WooCommerce: any;
  products: any[];
  page: number;
  category: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.page = 1;
    this.category = this.navParams.get("category");

    //initialize woocommerce
    this.WooCommerce = WC({
      url: "http://www.sentoubagroup.com",
      consumerKey: "ck_00e6818746b3df14e8fea155443d23f31a36a2d7",
      consumerSecret: "cs_11081baa2c245f774a941692e13b4a0f9b42b278"
    });

    this.WooCommerce.getAsync("products?filter[category]="+this.category.slug).then( (data)=> {
      console.log(JSON.parse(data.body));
      this.products = JSON.parse(data.body).products;
    }, (err)=>{
      console.log(err)
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsByCategoryPage');
  }

  loadMoreProducts(event){
    this.page++;
    console.log("Getting Page "+this.page);
    this.WooCommerce.getAsync("products?filter[category]="+this.category.slug + "&page=" +this.page).then((data) =>{
      let temp = (JSON.parse(data.body).products);

      this.products = this.products.concat(JSON.parse(data.body).products);
      console.log(this.products)
      event.complete();

      if(temp.lenght < 10){
        event.enable(false);
      }
    })
  }

  openProductPage(product){
    this.navCtrl.push(ProductDetailsPage,{"product": product});
  }

}
