import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-viewtypes',
  templateUrl: './viewtypes.component.html',
  styleUrls: ['./viewtypes.component.scss']
})
export class ViewtypesComponent {

  constructor(private route : ActivatedRoute, private productsService : ProductsService){}

  type : string;
  products : any = [];
  ngOnInit(){
    this.getType();
  }

  getType(){
    this.route.queryParams.subscribe( data => {
      this.type = data['type'];
      this.getProductsByType(this.type);
    });
  }

  getProductsByType(type : string){
    this.productsService.getProductsByType(type, Number(localStorage.getItem('id'))).subscribe( data => {
      this.products = data[0];
      console.log(this.products);
    });
  }

}
