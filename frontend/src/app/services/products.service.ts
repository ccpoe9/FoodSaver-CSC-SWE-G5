import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Config } from 'src/config/config';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http : HttpClient) { }
  queryParams : HttpParams;

  getProducts(storeID : number){
    this.queryParams = new HttpParams().set('ID', storeID);
    return this.http.get<any[]>(Config.APIROOT+Config.APIURLS.PRODUCTS, {params : this.queryParams})
    .pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      }));
  }
}
