import { Component, EventEmitter, Output } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
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
  UserAddress : string | null;
  search : string;
  theme : string;
  productTypes = ['Produce', 'Dairy & Eggs', 'Meat & Seafood', 
  'Beverages', 'Snacks', 'Prepared Food', 'Breakfast', 'Dry Goods & Pasta',
  'Bakery', 'Oils, Spices & Condiments'];

  shoppingSessions : any[] = [];

  constructor(private router : Router, private shoppingService : ShoppingService, private authService : AuthService){
    this.router.events
          .subscribe(
            (event: any) => {
              if(event instanceof NavigationStart) {
                this.currentPage = event.url;
                this.Username = localStorage.getItem('username');
                this.UserType = localStorage.getItem('user');
                this.UserID = Number(localStorage.getItem('id'));
                this.theme = localStorage.getItem('theme') || 'light';
                this.UserAddress = localStorage.getItem('address');
                if(this.UserAddress == 'null') this.UserAddress = "Enter Your Address";
              }
            });
  }

  ngOnInit(){
  }

  signOut(){
    //localStorage.clear();
    this.router.navigate(['landing']);
  }

  resetValues(){
    this.Username = localStorage.getItem('username');
    this.UserType = localStorage.getItem('user');
    this.UserID = Number(localStorage.getItem('id'));
    this.UserAddress = localStorage.getItem('address');
    if(this.UserAddress == 'null') this.UserAddress = "Enter Your Address";
  }

  getAllOfType(type : string){
    this.router.navigate(['viewtypes'], {queryParams :{type : type}});
  }

  searchProducts(){
    this.router.navigate(['search'], {queryParams : {s : this.search}});
  }
}
