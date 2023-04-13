import { Component } from '@angular/core';
import { StoresService } from 'src/app/services/stores.service';

@Component({
  selector: 'app-mystores',
  templateUrl: './mystores.component.html',
  styleUrls: ['./mystores.component.scss']
})
export class MystoresComponent {

  constructor(private storeService : StoresService){}

  myStores : any[] = [];
  ngOnInit(){
    this.getMyStores();
  }

  getMyStores(){
    this.storeService.getAdminStores(Number(localStorage.getItem('id')))
    .subscribe( data => {
      this.myStores = data[0];
    })
  }
}
