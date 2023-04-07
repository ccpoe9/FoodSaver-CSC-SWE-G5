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
  products : any[];
  filterargs = {title: 'hello'};
  
  ngOnInit() : void {
    this.getStores();
    this.getProducts();
  }

  getStores(){
    this.storeService.getStores()
    .subscribe( data => {
      this.stores = data;
      console.log(this.stores);
    });
  }

  getProducts(){
    this.productsService.getProducts()
    .subscribe( data => {
      this.products = data;
      console.log(this.products);
    })
  }
}
