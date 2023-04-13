import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Config } from 'src/config/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  queryParams : HttpParams;
  ngOnInit(){
  }

  setUser(userID : number, userType : string, Username : string, userAddress : string){
    localStorage.setItem('id', userID.toString());
    localStorage.setItem('user', userType);
    localStorage.setItem('username', Username);
    localStorage.setItem('address', userAddress);
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

  getUserInfo(customerID : number){
    this.queryParams = new HttpParams().set('customerID', customerID);
    return this.http.get<any[]>(Config.APIROOT+Config.APIURLS.CUSTOMERINFO, { params : this.queryParams})
    .pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      }));
  }

  editUserInfo(customerID : number, userInfo : any){
    let body = {
      customerID : customerID,
      Username : userInfo.Username,
      Email : userInfo.Email,
      Phone : userInfo.Phone,
      Address : userInfo.Address
    }
    return this.http.put<any[]>(Config.APIROOT+Config.APIURLS.CUSTOMERINFO, body)
    .pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      }));
  }

}
