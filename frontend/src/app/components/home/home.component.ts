import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { StoresService } from 'src/app/services/stores.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private productsService : ProductsService, private storeService : StoresService) { }
  stores : any[];
  topStores : any[];
  products : any = [];
  filterargs = {title: 'hello'};
  storeCount : number = 0;
  pageNumber : number = 1;
  TotalPages : number;
  TotalRecords : number;

  ngOnInit(){
    this.getTopStores();
  }

  getStores(page : number){
    this.storeService.getStores(page)
    .subscribe( data => {
      this.stores = data[0];
      this.TotalPages = data[2][0].TotalPages;
      this.TotalRecords = data[2][0].TotalRecords;
    });
  }

  getTopStores(){
    this.storeService.getStores(1)
    .subscribe( data => {
      this.stores = data[0];
      this.topStores = data[0];
      this.TotalPages = data[2][0].TotalPages;
      this.TotalRecords = data[2][0].TotalRecords;
    });
  }

  getNextStores(page : number){
    this.pageNumber = page;
    this.getStores(page);
  }

  getProducts(stores : any[]){
    for(let store of stores){
      this.products[store.ID] = this.productsService.getProducts(store.ID, this.pageNumber);
    }
    forkJoin(this.products).subscribe( data => {
      console.log(data);
    })
  }

  getStoreProducts(storeID : number){
    return this.products[storeID];
  }
}
