import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {

  constructor(private productsService : ProductsService){}

  favorites : any[] = [];
  ngOnInit(){
    this.getFavorites();
  }

  getFavorites(){
    this.productsService.getFavorites(Number(localStorage.getItem('id')))
    .subscribe( data => {
      this.favorites = data[0];
    })
  }

}
