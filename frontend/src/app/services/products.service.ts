import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Config } from 'src/config/config';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http : HttpClient) { }
  queryParams : HttpParams;

  getProducts(storeID : number, page : number, customerID : number){
    this.queryParams = new HttpParams().set('storeID', storeID).set('page', page).set('customerID', customerID);
    return this.http.get<any[]>(Config.APIROOT+Config.APIURLS.PRODUCTS, {params : this.queryParams})
    .pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      }));
  }

  getProductsByType(type : string, customerID : number){
    this.queryParams = new HttpParams().set('type', type).set('customerID', customerID);
    return this.http.get<any[]>(Config.APIROOT+Config.APIURLS.PRODUCTTYPES, {params : this.queryParams})
    .pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      }));
  }

  getProductsBySearch(search : string, customerID : number){
    this.queryParams = new HttpParams().set('search', search).set('customerID', customerID);
    return this.http.get<any[]>(Config.APIROOT+Config.APIURLS.PRODUCTSEARCH, {params : this.queryParams})
    .pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      }));
  }

  getProductsByStoreAndType(storeID : number, page : number, type : string, customerID : number){
    this.queryParams = new HttpParams().set('storeID', storeID).set('page', page).set('type', type).set('customerID', customerID);
    return this.http.get<any[]>(Config.APIROOT+Config.APIURLS.PRODUCTDETAILS, {params : this.queryParams})
    .pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      }));
  }

  getFavorites(customerID : number){
    this.queryParams = new HttpParams().set('customerID', customerID);
    return this.http.get<any[]>(Config.APIROOT+Config.APIURLS.FAVORITES, {params : this.queryParams})
    .pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      }));
  }
}
