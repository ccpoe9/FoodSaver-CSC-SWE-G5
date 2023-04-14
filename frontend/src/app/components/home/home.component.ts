import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
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
    private router : Router, private shoppingService : ShoppingService, private authService : AuthService)  { }
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
  theme : string;
  observablesList : any = [];
  ngOnInit(){
    this.UserID = Number(localStorage.getItem('id'));
    this.theme = localStorage.getItem('theme') || 'light';
    this.getTopStores();
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
    this.storeService.getStores(1).pipe( switchMap( data => {
      this.stores = data[0];
      this.topStores = data[0];
      this.TotalStorePages = data[2][0].TotalPages;
      this.TotalStoreRecords = data[2][0].TotalRecords;
      this.stores.forEach( store => {
        this.observablesList.push(this.productsService.getProducts(store.ID, this.pageNumber))
      });
      return forkJoin(this.observablesList);
    })).subscribe( data => {
      this.products = data;
    });
  }

  getNextStores(page : number){
    this.pageNumber = page;
    this.getStores(page);
  }

  getNextProducts(storeID : number, page : number){
    this.productsService.getProducts(storeID, page)
    .subscribe( data => {
      this.products[storeID-1][0] = data[0];
      this.currentPageStores[storeID] = page;
      this.products[storeID-1][2][0].TotalPages = data[2][0].TotalPages;
    });
  }

  viewAllProducts(storeID : number, storeName : string, StoreLogo : string){
    this.router.navigate(['/viewall'], {queryParams :{storeID: storeID, storeName : storeName, StoreLogo : StoreLogo}});
  }

  addToCart(productID : number, storeID : number){
    this.shoppingService.addToCart(this.UserID, productID, storeID)
    .pipe(switchMap (data => {
      return this.productsService.getProducts(storeID, this.currentPageStores[storeID]);
    })).subscribe( data => {
      this.products[storeID-1][0] = data[0];
      this.products[storeID-1][2][0].TotalPages = data[2][0].TotalPages;
    })
  }
}
