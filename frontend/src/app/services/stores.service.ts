import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Config } from 'src/config/config';

@Injectable({
  providedIn: 'root'
})
export class StoresService {

  constructor(private http : HttpClient) { }
  queryParams : HttpParams;

  getStores(page : number){
    this.queryParams = new HttpParams().set('page', page);
    return this.http.get<any[]>(Config.APIROOT + Config.APIURLS.STORES, {params : this.queryParams})
    .pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      }));
  }

  getAdminStores(supplierID : number){
    this.queryParams = new HttpParams().set('supplierID', supplierID);
    return this.http.get<any[]>(Config.APIROOT + Config.APIURLS.MYSTORES, {params : this.queryParams})
    .pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      }));
  }
}
