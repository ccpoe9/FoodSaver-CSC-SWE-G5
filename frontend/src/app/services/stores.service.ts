import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Config } from 'src/config/config';

@Injectable({
  providedIn: 'root'
})
export class StoresService {

  constructor(private http : HttpClient) { }

  getStores(){
    return this.http.get<any[]>(Config.APIROOT + Config.APIURLS.STORES, {responseType : 'json'})
    .pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      }));
  }
}
