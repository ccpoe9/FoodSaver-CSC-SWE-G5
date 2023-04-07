import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Config } from 'src/config/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  loginCustomer(userInfo : any){
    return this.http.post<any[]>(Config.APIROOT+Config.APIURLS.CUSTOMERLOGIN, userInfo, {responseType: 'json' })
    .pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      }));
  }

  signUpCustomer(userInfo : any){
    return this.http.post(Config.APIROOT+Config.APIURLS.CUSTOMERSIGNUP, userInfo, {responseType: 'json' })
    .pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      }));
  }

  loginAdmin(userInfo : any){
    return this.http.post<any[]>(Config.APIROOT+Config.APIURLS.SUPPLIERLOGIN, userInfo, {responseType: 'json' })
    .pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      }));
  }

}
