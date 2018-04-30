import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class Signup {

  newsUser: any = {};
  billing_shopping_same;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
this.newsUser.billing_address = {};
this.newsUser.shipping_address = {};
this.newsUser.shipping_shipping = false;
this.billing_shopping_same = false;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  setBillingToShop(){
    this.billing_shopping_same = !this.billing_shopping_same;
  }

}
