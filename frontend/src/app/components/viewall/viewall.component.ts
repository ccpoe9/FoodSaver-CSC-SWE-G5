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
  'Beverages', 'Snacks', 'Prepared Food', 'Breakfast', 'Dry Goods & Pasta',
  'Bakery', 'Oils, Spices & Condiments'];

  StoreName : string;
  StoreID : number;
  StoreLogo : string;

  products : any = [];
  currentPages = [1,1,1,1,1,1,1,1,1,1];
  totalPages : any = [];
  totalRecords : any = [];
  constructor(private route : ActivatedRoute, private productService : ProductsService) {
    
  }
  ngOnInit(){
    this.getStoreInfo();
  }

  getStoreInfo(){
    this.route.queryParams.subscribe( data => {
      this.StoreID = data['storeID'];
      this.StoreName = data['storeName'];
      this.StoreLogo = data['StoreLogo'];
      this.getProductsByStoreAndType();
    });
  }

  getProductsByStoreAndType(){
    this.products[0] = [];
    for(let i = 0; i < this.productTypes.length; i++){
      this.productService.getProductsByStoreAndType(this.StoreID, this.currentPages[i], this.productTypes[i]).subscribe( data => {
        this.products[i] = data[0];
        this.totalPages[i] = data[2][0].TotalPages;
        this.totalRecords[i] = data[2][0].TotalRecords;
      });
    }
  }

  getNextPage(index : number ,page : number, type : string){
    this.currentPages[index] = page;
    this.productService.getProductsByStoreAndType(this.StoreID, this.currentPages[index], type).subscribe( data => {
      this.products[index] = data[0];
      this.totalPages[index] = data[2][0].TotalPages;
      this.totalRecords[index] = data[2][0].TotalRecords;
    });
  }

  
}
