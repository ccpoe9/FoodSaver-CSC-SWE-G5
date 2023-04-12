import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Config } from 'src/config/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  ngOnInit(){
  }

  setUser(userID : number, userType : string, Username : string){
    localStorage.setItem('id', userID.toString());
    localStorage.setItem('user', userType);
    localStorage.setItem('username', Username);
  }

  loginCustomer(userInfo : any){
    return this.http.post<any[]>(Config.APIROOT+Config.APIURLS.CUSTOMERLOGIN, userInfo, {responseType: 'json' })
    .pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      }));
  }

  signUpCustomer(userInfo : any){
    return this.http.post<any[]>(Config.APIROOT+Config.APIURLS.CUSTOMERSIGNUP, userInfo, {responseType: 'json' })
    .pipe(
      catchError((err) => {
        //if(err.startsWith())
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
