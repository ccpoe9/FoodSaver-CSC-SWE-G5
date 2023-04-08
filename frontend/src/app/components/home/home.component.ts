import { Component } from '@angular/core';
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
  products : any = [];
  filterargs = {title: 'hello'};
  storeCount : number = 0;
  pageNumber : number = 1;
  async ngOnInit() : Promise<void> {
    await this.getStores(this.pageNumber);
  }

  getStores(page : number){
    this.storeService.getStores(page)
    .subscribe( data => {
      this.stores = data[0];
      console.log(this.stores);
      /*for(let store of this.stores){
        this.productsService.getProducts(store.ID)
        .subscribe( data => {
          this.products[store.ID] = data;
        })
      }*/
    });
  }

  getProducts(storeID : number){
    return this.products[storeID];
  }
}
