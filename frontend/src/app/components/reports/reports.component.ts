import { Component, ElementRef, ViewChild } from '@angular/core';
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
  Message : string = "";
  newReport = {
    Title : "",
    Desc : "",
    storeName : "",
    customerID : localStorage.getItem('id')
  }

  @ViewChild('closebtn') closeButton: ElementRef;

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
    if(this.newReport.Title == '' || this.newReport.Desc == '' || this.newReport.storeName == ''
    || this.newReport.Title.indexOf("\"") != -1 || this.newReport.Desc.indexOf("\"") != -1 || this.newReport.storeName.indexOf("\"") != -1){
      this.Message = "Fields cannot be empty or contain (\")";
    }
    else{
      this.Message = "";
      this.closeButton.nativeElement.click();
      this.reportsService.createReports(this.newReport)
      .pipe( switchMap( () => {
        return this.reportsService.getReports(Number(localStorage.getItem('id')));
      }))
      .subscribe( data => {
        this.reports = data[0];
        
      });
    }
  }
  getStores(){
    this.storesService.getAllStores()
    .subscribe( data => {
      this.stores = data;
    })
  }

}
