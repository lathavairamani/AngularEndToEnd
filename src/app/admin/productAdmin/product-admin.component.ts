import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../adminShared/user.service';
import { ProductAdminService } from '../adminShared/product-admin.service';
import { Product } from '../adminShared/product';
import * as firebase from 'firebase';

@Component({
  templateUrl: 'product-admin.component.html',
  styleUrls: ['product-admin.component.css']
})

export class ProductAdminComponent implements OnInit {
  
  user: string;
  menuChoice: string;
  theProducts: Product[];
  formDisplay: boolean = true;
  singleProduct: Product;
  
  constructor(private userService: UserService, private router: Router, private productAdminService: ProductAdminService){}
  
  logout(){
    this.userService.logout();
    this.router.navigate(['']);
  }
  
  chooseMode(mode: string){
    this.menuChoice = mode;
  }
  
  ngOnInit(){
    this.user = this.userService.loggedInUser;
    this.getProducts();
  }
  
  getProducts(){
    let dbRef = firebase.database().ref('products/');
    dbRef.once('value')
    .then((snapshot) => {
      let tmp: string[] = snapshot.val();
      this.theProducts = Object.keys(tmp).map(key => tmp[key])
    });
  }
  
  editProduct(theProduct: Product){
    this.singleProduct = theProduct;
    this.formDisplay = false;
  }
  
  cancelEdit(){
    this.formDisplay = true;
  }
  
  updateProduct(single: Product){
    this.productAdminService.editProduct(single);
    this.formDisplay = true;
  }
  
  deleteProduct(single: Product){
    let verify = confirm(`Are you sure you want to delete this product?`);
    if(verify === true){
      this.productAdminService.removeProduct(single);
      this.router.navigate(['/admin/']);
    }else{
      alert('Nothing deleted');
    }
  }
  
}