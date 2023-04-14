import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, switchMap } from 'rxjs';
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

  observablesList : any = [];
  
  constructor(private route : ActivatedRoute, private productService : ProductsService) {
    
  }
  ngOnInit(){
    this.getStoreInfo();
  }

  getStoreInfo(){
    this.route.queryParams.pipe(switchMap( data => {
      this.StoreID = data['storeID'];
      this.StoreName = data['storeName'];
      this.StoreLogo = data['StoreLogo'];

      for(let i = 0; i < this.productTypes.length; i++){
        this.observablesList.push(this.productService.
        getProductsByStoreAndType(this.StoreID, this.currentPages[i], this.productTypes[i]));
      }
      return forkJoin(this.observablesList);
    }))
    .subscribe( data => {
      this.products = data;
      console.log(this.products[0][2][0].TotalPages);
    });
  }
  getTotalPages( i : number){
    return this.products[i][2][0].TotalPages;
  }

  getNextPage(index : number ,page : number, type : string){
    this.currentPages[index] = page;
    this.productService.getProductsByStoreAndType(this.StoreID, this.currentPages[index], type).subscribe( data => {
      console.log(data);
      this.products[index][0] = data[0];
      this.products[index][2][0].TotalPages = data[2][0].TotalPages;
    });
  }

  
}
