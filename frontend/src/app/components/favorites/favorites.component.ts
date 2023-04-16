import { Component } from '@angular/core';
import { switchMap } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {

  constructor(private productsService : ProductsService, private shoppingService : ShoppingService){}

  favorites : any[] = [];
  UserID : number;
  ngOnInit(){
    this.UserID = Number(localStorage.getItem('id'));
    this.getFavorites();
  }

  getFavorites(){
    this.productsService.getFavorites(this.UserID)
    .subscribe( data => {
      this.favorites = data[0];
    })
  }

  addToCart(productID : number, storeID : number, quantity : number){
    if(quantity != 0){
      this.shoppingService.addToCart(this.UserID, productID, storeID)
      .pipe( switchMap( data => {
        this.shoppingService.updateTotalCart(this.UserID);
        return this.productsService.getFavorites(this.UserID);
      }))
      .subscribe( data => {
        this.favorites = data[0];
      });
    }
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
