import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private productsService : ProductsService) { }
  products : any;

  ngOnInit() : void {
    this.getProducts();
    
  }

  getProducts(){
    this.productsService.getProducts().subscribe( data => {
      this.products = data;
    })
  }
}
