import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  constructor(private route : ActivatedRoute, private productsService : ProductsService,
    private shoppingService : ShoppingService){}

  search : string;

  searchResults : any = [];

  UserID : number;
  UserType : string | null;
  
  message : String = 'Out of Stock!';
  favorites : any[] = [];

  ngOnInit(){
    this.UserID = Number(localStorage.getItem('id'));
    this.UserType = localStorage.getItem('user');
    this.Search();
  }

  Search(){
    this.route.queryParams.pipe( switchMap( data => {
      this.search = data['s'];
      return this.productsService.getProductsBySearch(this.search, this.UserID);
    }))
    .pipe( switchMap ( data => {
      this.searchResults = data[0];
      return this.productsService.getFavorites(this.UserID)
    }))
    .subscribe( data => {
      this.favorites = data[0];
    });
  }

  addToCart(productID : number, storeID : number, quantity : number){
    if(quantity > 0){
      this.shoppingService.addToCart(this.UserID, productID, storeID)
      .pipe(switchMap (data => {

        return this.productsService.getProductsBySearch(this.search, this.UserID);
      })).subscribe( data => {
        this.searchResults = data[0];
        this.shoppingService.updateTotalCart(this.UserID);
      });
    }
  }

  removeFromCart(productID : number, storeID : number){
    this.shoppingService.removeFromCart(this.UserID, productID, storeID)
    .pipe(switchMap (data => {
      return this.productsService.getProductsBySearch(this.search, this.UserID);
      })).subscribe( data => {
        this.searchResults = data[0];
        this.shoppingService.updateTotalCart(this.UserID);
      });
  }

  checkFavorite(productID : number){
    return this.favorites.some( product => product.ProductID == productID )
  }

  changeFavorite(productID : number, isFavorite : boolean){
    if(isFavorite) this.removeFromFavorites(productID);
    else this.addToFavorites(productID);
  }

  addToFavorites(productID : number){
    this.productsService.addFavorites(this.UserID, productID)
    .pipe( switchMap ( data => {
      return this.productsService.getFavorites(this.UserID);
    })).subscribe( data => {
      this.favorites = data[0];
    });
  }

  removeFromFavorites(productID : number){
    this.productsService.removeFavorites(this.UserID, productID)
    .pipe( switchMap ( data => {
      return this.productsService.getFavorites(this.UserID);
    })).subscribe( data => {
      this.favorites = data[0];
    });
  }

}
