import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Config } from 'src/config/config';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http : HttpClient) { }

  getProducts(){
    return this.http.get(Config.APIROOT+Config.APIURLS.PRODUCTS)
    .pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      }));
  }
}
