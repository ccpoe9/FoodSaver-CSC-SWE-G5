import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, switchMap } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-viewall',
  templateUrl: './viewall.component.html',
  styleUrls: ['./viewall.component.scss']
})
export class ViewallComponent {
  productTypes = ['Produce', 'Dairy & Eggs', 'Meat & Seafood', 
  'Beverages', 'Snacks', 'Prepared Food', 'Breakfast', 'Dry Goods & Pasta',
  'Bakery', 'Oils, Spices & Condiments'];

  StoreName : string;
  StoreID : number;
  StoreLogo : string;

  UserID : number;
  UserType : string | null;
  products : any = [];
  favorites : any[] = [];
  currentPages = [1,1,1,1,1,1,1,1,1,1];
  totalPages : any = [];
  totalRecords : any = [];

  observablesList : any = [];
  message : String = 'Out of Stock!';
  constructor(private route : ActivatedRoute, private productService : ProductsService,
    private shoppingService : ShoppingService) {
    
  }
  ngOnInit(){
    this.UserID = Number(localStorage.getItem('id'));
    this.UserType = localStorage.getItem('user');
    this.getStoreInfo();
  }

  getStoreInfo(){
    this.route.queryParams.pipe(switchMap( data => {
      this.StoreID = data['storeID'];
      this.StoreName = data['storeName'];
      this.StoreLogo = data['StoreLogo'];

      for(let i = 0; i < this.productTypes.length; i++){
        this.observablesList.push(this.productService.
        getProductsByStoreAndType(this.StoreID, this.currentPages[i], this.productTypes[i], this.UserID));
      }
      return forkJoin(this.observablesList);
    })).pipe( switchMap ( (data : any) => {
      this.products = data;
      return this.productService.getFavorites(this.UserID)
    }))
    .subscribe( data => {
      this.favorites = data[0];
    });
  }

  getNextPage(index : number ,page : number, type : string){
    this.currentPages[index] = page;
    this.productService.getProductsByStoreAndType(this.StoreID, this.currentPages[index], type, this.UserID).subscribe( data => {
      this.products[index][0] = data[0];
      this.products[index][2][0].TotalPages = data[2][0].TotalPages;
    });
  }

  addToCart(productID : number, storeID : number, quantity : number, index : number, type : string){
    if(quantity <= 0){
      this.shoppingService.addToCart(this.UserID, productID, storeID)
      .pipe(switchMap (data => {

        return this.productService.getProductsByStoreAndType(this.StoreID, this.currentPages[index], type, this.UserID);
      })).subscribe( data => {
        this.products[index][0] = data[0];
        this.products[index][2][0].TotalPages = data[2][0].TotalPages;
        this.shoppingService.updateTotalCart(this.UserID);
      });
    }
  }

  removeFromCart(productID : number, storeID : number, index : number, type : string){
    this.shoppingService.removeFromCart(this.UserID, productID, storeID)
    .pipe(switchMap (data => {
      return this.productService.getProductsByStoreAndType(this.StoreID, this.currentPages[index], type, this.UserID);
    })).subscribe( data => {
      this.products[index][0] = data[0];
      this.products[index][2][0].TotalPages = data[2][0].TotalPages;
      this.shoppingService.updateTotalCart(this.UserID);
    })
  }

  checkFavorite(productID : number){
    return this.favorites.some( product => product.ProductID == productID )
  }

  changeFavorite(productID : number, isFavorite : boolean){
    if(isFavorite) this.removeFromFavorites(productID);
    else this.addToFavorites(productID);
  }

  addToFavorites(productID : number){
    this.productService.addFavorites(this.UserID, productID)
    .pipe( switchMap ( data => {
      return this.productService.getFavorites(this.UserID);
    })).subscribe( data => {
      this.favorites = data[0];
    });
  }

  removeFromFavorites(productID : number){
    this.productService.removeFavorites(this.UserID, productID)
    .pipe( switchMap ( data => {
      return this.productService.getFavorites(this.UserID);
    })).subscribe( data => {
      this.favorites = data[0];
    });
  }
  
}
