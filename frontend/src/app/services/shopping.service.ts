import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { Config } from 'src/config/config';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  constructor(private http : HttpClient) { }
  queryParams : HttpParams;

  totalItems$ : BehaviorSubject<number> = new BehaviorSubject<number>(0);

  getShoppingSessions(customerID : number){
    this.queryParams = new HttpParams().set('customerID', customerID);
    return this.http.get<any[]>(Config.APIROOT+Config.APIURLS.SESSIONS, {params : this.queryParams})
    .pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      }));
  }

  RemoveShoppingSession(sessionID : number){
    this.queryParams = new HttpParams().set('sessionID', sessionID);
    return this.http.delete<any[]>(Config.APIROOT+Config.APIURLS.SESSIONS, {params : this.queryParams})
    .pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      }));
  }

  addToCart(customerID : number, productID : number, storeID : number){
    let body = {
      customerID : customerID,
      productID : productID,
      storeID : storeID
    }
    return this.http.post<any[]>(Config.APIROOT+Config.APIURLS.CART, body)
    .pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      }));
  }

  removeFromCart(customerID : number, productID : number, storeID : number){
    this.queryParams = new HttpParams().set('customerID', customerID).set('productID', productID).set('storeID', storeID);
    return this.http.delete<any[]>(Config.APIROOT+Config.APIURLS.CART, {params : this.queryParams})
    .pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      }));
  }

  updateTotalCart(customerID : number){
    let shoppingSessions : any = []
    let totalitems = 0;
    this.getShoppingSessions(customerID)
    .subscribe( data => {
      shoppingSessions = data[0];
      shoppingSessions.forEach( (session : any) => {
        totalitems+=session.CartCount;
      });
      this.totalItems$.next(totalitems);
    });
    
  }

  CreateOrder(body : any){
    return this.http.post<any[]>(Config.APIROOT+Config.APIURLS.ORDERS, body)
    .pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      }));
  }

  getOrders(customerID : number){
    this.queryParams = new HttpParams().set('customerID', customerID);
    return this.http.get<any[]>(Config.APIROOT+Config.APIURLS.ORDERS, {params : this.queryParams})
    .pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      }));
  }

  getAdminOrders(storeID : number){
    this.queryParams = new HttpParams().set('storeID', storeID);
    return this.http.get<any[]>(Config.APIROOT+Config.APIURLS.ORDERSADMIN, {params : this.queryParams})
    .pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      }));
  }

  getOrderDetails(orderID : number){
    this.queryParams = new HttpParams().set('orderID', orderID);
    return this.http.get<any[]>(Config.APIROOT+Config.APIURLS.ORDERDETAILS, {params : this.queryParams})
    .pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      }));
  }

  editOrder(body : any){
    return this.http.put<any[]>(Config.APIROOT+Config.APIURLS.ORDERS, body)
    .pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      }));
  }



}
