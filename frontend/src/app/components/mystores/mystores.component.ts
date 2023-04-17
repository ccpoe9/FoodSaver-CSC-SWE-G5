import { Component, ElementRef, ViewChild } from '@angular/core';
import { switchMap } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { StoresService } from 'src/app/services/stores.service';

@Component({
  selector: 'app-mystores',
  templateUrl: './mystores.component.html',
  styleUrls: ['./mystores.component.scss']
})
export class MystoresComponent {

  constructor(private storeService : StoresService, private productsService : ProductsService){}

  myStores : any[] = [];

  StoreID : number;
  productTypes = ['Produce', 'Dairy & Eggs', 'Meat & Seafood', 
  'Beverages', 'Snacks', 'Prepared Food', 'Breakfast', 'Dry Goods & Pasta',
  'Bakery', 'Oils, Spices & Condiments'];

  Message : string;

  newProduct = {
    Name : "",
    Price : 0.00,
    ExpireDate : "",
    Type : "",
    Description : "",
    Image : "",
    Quantity : 0,
    StoreID : 0
  }

  products : any[] = [];

  @ViewChild('discardbtn') discardButton: ElementRef;

  ngOnInit(){
    this.getMyStores();
  }

  getMyStores(){
    this.storeService.getAdminStores(Number(localStorage.getItem('id')))
    .subscribe( data => {
      this.myStores = data[0];
    })
  }

  setStoreID(storeID : number){
    this.StoreID = storeID;
  }

  addProduct(){
    this.newProduct.StoreID = this.StoreID;
    if(this.newProduct.Name != '' && this.newProduct.Price != 0.00){
      this.Message = "";
      this.productsService.createProducts(this.newProduct)
      .subscribe( () => {
        this.discardButton.nativeElement.click();
      });
    }
    else{
      this.Message = "Name and Price fields cannot be empty"
    }
  }

  getAdminProducts(storeID : number){
    this.setStoreID(storeID);
    this.productsService.getAdminProducts(storeID)
    .subscribe( data => {
      this.products = data[0];
    })
  }

  deleteProduct(productID : number){
    this.productsService.deleteProducts(productID)
    .pipe( switchMap ( () => {
      return this.productsService.getAdminProducts(this.StoreID);
    }))
    .subscribe( data => {
      this.products = data[0];
    })
  }
}
