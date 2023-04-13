import { Component } from '@angular/core';
import { switchMap } from 'rxjs';
import { ReportsService } from 'src/app/services/reports.service';
import { StoresService } from 'src/app/services/stores.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {

  constructor(private reportsService : ReportsService, private storesService : StoresService){}
  userType : string;
  reports : any[] = [];
  stores : any[] = [];

  newReport = {
    Title : "",
    Desc : "",
    storeName : "",
    customerID : localStorage.getItem('id')
  }
  ngOnInit(){
    if(localStorage.getItem('user') == 'Customer') this.getReports();
    if(localStorage.getItem('user') == 'Admin') this.getAdminReports();
    
  }

  getReports(){
    this.reportsService.getReports(Number(localStorage.getItem('id')))
    .subscribe( data => {
      this.userType = 'Customer';
      this.reports = data[0];
    })
  }

  getAdminReports(){
    this.reportsService.getAdminReports(Number(localStorage.getItem('id')))
    .subscribe( data => {
      this.userType = 'Admin';
      this.reports = data[0];
    })
  }
  createReport(){
    this.reportsService.createReports(this.newReport)
    .pipe( switchMap( () => {
      return this.reportsService.getReports(Number(localStorage.getItem('id')));
    }))
    .subscribe( data => {
      this.reports = data[0];
    });
  }
  getStores(){
    this.storesService.getAllStores()
    .subscribe( data => {
      this.stores = data;
    })
  }

}
