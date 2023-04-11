import { Component, EventEmitter, Output } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  currentPage: string;
  Username : string | null;
  UserType : string | null;
  UserID : number;
  search : string;

  productTypes = ['Produce', 'Dairy & Eggs', 'Meat & Seafood', 
  'Beverages', 'Snacks', 'Prepared Food', 'Breakfast', 'Dry Goods & Pasta',
  'Bakery', 'Oils, Spices & Condiments'];

  shoppingSessions : any[] = [];

  constructor(private router : Router, private shoppingService : ShoppingService){
    this.router.events
          .subscribe(
            (event: any) => {
              if(event instanceof NavigationStart) {
                this.currentPage = event.url;
                this.Username = localStorage.getItem('Username');
                this.UserType = localStorage.getItem('User');
                this.UserID = Number(localStorage.getItem('UserID'));
              }
            });
  }
  
  signOut(){
    localStorage.removeItem('User');
    localStorage.removeItem('UserID');
    localStorage.removeItem('Username');
    this.router.navigate(['landing']);
  }

  getAllOfType(type : string){
    this.router.navigate(['viewtypes'], {queryParams :{type : type}});
  }

  searchProducts(){
    this.router.navigate(['search'], {queryParams : {s : this.search}});
  }

  getShoppingSessions(){
    this.shoppingService.getShoppingSession(this.UserID).subscribe( data => {
      this.shoppingSessions = data[0];
      console.log(data[0])
    })
  }
}
