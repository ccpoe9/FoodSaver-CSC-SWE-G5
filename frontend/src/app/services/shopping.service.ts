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
    return this.http.post(Config.APIROOT + Config.APIURLS.SHOPPINGSESSION, { customerID : customerID, storeID : storeID });
  }
  getShoppingSession(customerID : number){
    this.queryParams = new HttpParams().set('customerID', customerID);
    return this.http.get<any[]>(Config.APIROOT + Config.APIURLS.SHOPPINGSESSION, { params : this.queryParams });
  }
  createCartItem(productID : number, customerID : number, storeID : number){
    return this.http.post(Config.APIROOT + Config.APIURLS.CARTITEM, { productID : productID, customerID : customerID, storeID : storeID });
  }
  removeCartItem(productID : number, customerID : number, storeID : number){
    this.queryParams = new HttpParams().set('customerID', customerID).set('productID', productID).set('storeID', storeID);
    return this.http.delete(Config.APIROOT + Config.APIURLS.CARTITEM, { params : this.queryParams});
  }

}
