import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Product } from './product';

@Injectable()
export class ProductAdminService{
  
  createProduct(prod: Product){
    let storageRef = firebase.storage().ref();
    storageRef.child(`product_images/${prod.imgTitle}`).putString(prod.img, 'base64').
      then((snapshot) => {
        let url = snapshot.metadata.downloadURLs[0];
        let dbRef = firebase.database().ref('products/');
        let newProd = dbRef.push();
        newProd.set({
          name: prod.name,
          description: prod.description,
          imgTitle: prod.imgTitle,
          img: url,
          price: prod.price,
          id: newProd.key
        });
      }) 
    .catch((error) => {
      alert(`failed upload: ${error}`);
    })
  }
  
  editProduct(update:Product){
    let dbRef = firebase.database().ref('products/').child(update.id).
        update({
          title: update.name,
          content: update.description,
          price: update.price
        })
    alert('product updated');
  }
  
  removeProduct(deleteProduct: Product){
    let dbRef = firebase.database().ref('products/').child(deleteProduct.id).remove();
    alert('product deleted');
    let imageRef = firebase.storage().ref().child(`product_images/${deleteProduct.imgTitle}`)
        .delete().then(function(){
          alert(`${deleteProduct.imgTitle} was deleted from the storage`);
        }).catch(function(error) {
          alert(`Error unable to delete ${deleteProduct.imgTitle}`);
        });
  }
  
}