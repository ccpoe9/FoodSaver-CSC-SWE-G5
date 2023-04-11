import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, switchMap } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { ShoppingService } from 'src/app/services/shopping.service';
import { StoresService } from 'src/app/services/stores.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private productsService : ProductsService, private storeService : StoresService, 
    private router : Router, private shoppingService : ShoppingService)  { }
  stores : any[];
  topStores : any[];
  products : any = [];
  productsCount : any = [];
  storeCount : number = 0;
  pageNumber : number = 1;
  TotalStorePages : number;
  TotalStoreRecords : number;
  currentPageStores = [0, 1, 1, 1, 1, 1];
  UserID : number;
  ngOnInit(){
    this.getTopStores();
    this.UserID = Number(localStorage.getItem('UserID'));
    console.log(this.productsCount);
  }

  getStores(page : number){
    this.storeService.getStores(page)
    .subscribe( data => {
      this.stores = data[0];
      this.TotalStorePages = data[2][0].TotalPages;
      this.TotalStoreRecords = data[2][0].TotalRecords;
    });
  }

  getTopStores(){
    this.storeService.getStores(1)
    .subscribe( async data => {
      this.stores = data[0];
      this.topStores = data[0];
      this.TotalStorePages = data[2][0].TotalPages;
      this.TotalStoreRecords = data[2][0].TotalRecords;
      this.getProducts(this.stores);
    });
  }

  getNextStores(page : number){
    this.pageNumber = page;
    this.getStores(page);
  }

  getProducts(stores : any[]){
    this.products[0] = [];
    for(let store of stores){
      this.productsService.getProducts(store.ID, this.pageNumber)
      .subscribe( data => {
        this.products[store.ID] = data[0];
        this.productsCount[store.ID] = Array<number>(data[2][0].TotalRecords).fill(0);
        this.products[0][store.ID] = data[2][0].TotalPages;
      });
    }
  }

  getNextProducts(storeID : number, page : number){
    this.productsService.getProducts(storeID, page)
    .subscribe( data => {
      this.products[storeID] = data[0];
      this.currentPageStores[storeID] = page;
      this.products[0][storeID] = data[2][0].TotalPages;
    });
  }

  viewAllProducts(storeID : number, storeName : string, StoreLogo : string){
    this.router.navigate(['/viewall'], {queryParams :{storeID: storeID, storeName : storeName, StoreLogo : StoreLogo}});
  }

  addItemtoCartCheck(storeID : number, index : number, productID : number){
    
    if(this.productsCount[storeID][((this.currentPageStores[storeID] - 1) * 6) + index] == 0){
      this.addNewItemtoCart(storeID, productID);
    }
    else{
      this.addItemtoCart(storeID, productID);
    }
    this.productsCount[storeID][((this.currentPageStores[storeID] - 1) * 6) + index]++;

  }

  addItemtoCart(storeID : number, productID : number){
    this.shoppingService.createCartItem(productID, this.UserID, storeID).subscribe();
  }
  addNewItemtoCart(storeID : number, productID : number){
    this.shoppingService.createShoppingSession(this.UserID, storeID).pipe( switchMap( () => {
      return this.shoppingService.createCartItem(productID, this.UserID, storeID)
    })).subscribe();
  }

  canDelete(storeID : number, index : number){
    if(this.productsCount[storeID][((this.currentPageStores[storeID] - 1) * 6) + index] >= 1){
      return true;
    }
    else return false;
  }
  deleteitemFromCart(storeID : number, productID: number, index : number){
    if(this.productsCount[storeID][((this.currentPageStores[storeID] - 1) * 6) + index] >= 1){
      this.productsCount[storeID][((this.currentPageStores[storeID] - 1) * 6) + index]--;
      this.shoppingService.removeCartItem(productID, this.UserID, storeID).subscribe();
    }
  }
}
