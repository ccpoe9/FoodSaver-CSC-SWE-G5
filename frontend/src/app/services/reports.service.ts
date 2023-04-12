import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Config } from 'src/config/config';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http : HttpClient) { }
  queryParams : HttpParams;

  getReports(customerID : number){
    this.queryParams = new HttpParams().set('customerID', customerID);
    return this.http.get<any[]>(Config.APIROOT+Config.APIURLS.REPORTS, {params : this.queryParams})
    .pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      }));
  }

  getAdminReports(supplierID : number){
    this.queryParams = new HttpParams().set('supplierID', supplierID);
    return this.http.get<any[]>(Config.APIROOT+Config.APIURLS.ADMINREPORTS, {params : this.queryParams})
    .pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      }));
  }

}
