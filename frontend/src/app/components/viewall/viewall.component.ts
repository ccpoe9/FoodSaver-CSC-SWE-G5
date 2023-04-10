import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-viewall',
  templateUrl: './viewall.component.html',
  styleUrls: ['./viewall.component.scss']
})
export class ViewallComponent {
  productTypes = ['Produce', 'Dairy & Eggs', 'Meat & Seafood', 
  'Beverages', 'Snacks', 'Prepared Foods', 'Breakfast', 'Dry Goods & Pasta',
  'Bakery', 'Oils, Spices & Condiments'];

  StoreName : string;
  StoreID : number;
  StoreLogo : string;
  constructor(private route : ActivatedRoute, private productService : ProductsService) {
    
  }
  ngOnInit(){

    this.route.queryParams.subscribe( data => {
      this.StoreID = data['storeID'];
      this.StoreName = data['storeName'];
      this.StoreLogo = data['StoreLogo'];
    });
  }

  
}
