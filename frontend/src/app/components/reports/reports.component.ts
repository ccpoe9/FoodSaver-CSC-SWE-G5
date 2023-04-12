import { Component } from '@angular/core';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {

  constructor(private reportsService : ReportsService){}

  reports : any[] = [];
  ngOnInit(){
    this.getReports();
  }

  getReports(){
    this.reportsService.getReports(Number(localStorage.getItem('id')))
    .subscribe( data => {
      this.reports = data[0];
    })
  }
}
