import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  constructor(private route : ActivatedRoute, private productsService : ProductsService){}

  search : string;

  searchResults : any = [];

  ngOnInit(){
    this.Search();
  }

  Search(){
    this.route.queryParams.pipe( switchMap( data => {
      this.search = data['s'];
      return this.productsService.getProductsBySearch(this.search);
    }))
    .subscribe( data => {
      this.searchResults = data[0];
    });
  }

}
