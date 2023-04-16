import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-viewtypes',
  templateUrl: './viewtypes.component.html',
  styleUrls: ['./viewtypes.component.scss']
})
export class ViewtypesComponent {

  constructor(private route : ActivatedRoute, private productsService : ProductsService,
    private shoppingService : ShoppingService){}

  type : string;
  products : any = [];
  UserID : number;
  favorites : any[] = [];
  message : String = 'Out of Stock!';
  ngOnInit(){
    this.UserID = Number(localStorage.getItem('id'));
    this.getType();
  }

  getType(){
    this.route.queryParams.pipe( switchMap( data => {
      this.type = data['type'];
      return this.productsService.getProductsByType(this.type, this.UserID);
    })).pipe( switchMap ( data => {
      this.products = data[0];
      console.log(this.products);
      return this.productsService.getFavorites(this.UserID);
    })).subscribe( data => {
      this.favorites = data[0];
    })
  }

  addToCart(productID : number, storeID : number, quantity : number, type : string){
    if(quantity != 0){
      this.shoppingService.addToCart(this.UserID, productID, storeID)
      .pipe(switchMap (data => {

        return this.productsService.getProductsByType(type, this.UserID);
      })).subscribe( data => {
        this.products = data[0];
        this.shoppingService.updateTotalCart(this.UserID);
      });
    }
  }

  removeFromCart(productID : number, storeID : number, type : string){
    this.shoppingService.removeFromCart(this.UserID, productID, storeID)
    .pipe(switchMap (data => {
      return this.productsService.getProductsByType(type, this.UserID);;
    })).subscribe( data => {
      this.products = data[0];
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
