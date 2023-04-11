import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Config } from 'src/config/config';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  constructor(private http : HttpClient) { }
  queryParams : HttpParams;

  createShoppingSession(customerID : number, storeID : number){
    return this.http.post(Config.APIROOT+Config.APIURLS.SHOPPINGSESSION, {"customerID" : customerID, "storeID" : storeID})
    .pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      }));
  }

  createCartItem(productID : number, storeID : number, customerID : number){
    return this.http.post(Config.APIROOT+Config.APIURLS.CART, {"productID" : productID, "storeID" : storeID, "customerID" : customerID})
    .pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      }));
  }

  getCartItemCount(productName : string, storeID : number){
    this.queryParams = new HttpParams().set('storeID', storeID).set('productName', productName)
    return this.http.get<any[]>(Config.APIROOT+Config.APIURLS.CART, {params : this.queryParams})
    .pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      }));
  }
}
