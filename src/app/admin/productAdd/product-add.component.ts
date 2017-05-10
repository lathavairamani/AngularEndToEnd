import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../adminShared/product';
import { ProductAdminService } from '../adminShared/product-admin.service';

@Component({
  selector: 'product-menu',
  templateUrl: './product-add.component.html'
})

export class ProductAddComponent {
  imgTitle: string;
  imageSrc: string;
  name: string;
  description: string;
  price: number
  product: Product;
  
  constructor(private productAdminService: ProductAdminService, private router: Router){}
  
  fileLoad($event:any){
    let reader: FileReader = new FileReader();
    let file: File = $event.target.files[0];
    this.imgTitle = file.name;
    reader.readAsDataURL(file);
    
    reader.onload = (e: any) => {
      this.imageSrc = e.target.result;
    }
  }
  
  createProduct(){
    this.product = new Product(this.name, this.description, this.imgTitle, this.imageSrc.substring(23), this.price);
    this.productAdminService.createProduct(this.product);
    alert(`${this.name} added to products`);
    this.router.navigate(['/admin']);
  }
  
  cancel(){
    this.router.navigate(['/admin']);
  }
  
}