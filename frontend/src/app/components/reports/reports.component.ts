import { Component } from '@angular/core';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {

  constructor(private reportsService : ReportsService){}
  userType : string;
  reports : any[] = [];
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
}
