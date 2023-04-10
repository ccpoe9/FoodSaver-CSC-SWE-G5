import { Component, EventEmitter, Output } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  currentPage: string;
  Username : string | null;
  UserType : string | null;

  productTypes = ['Produce', 'Dairy & Eggs', 'Meat & Seafood', 
  'Beverages', 'Snacks', 'Prepared Food', 'Breakfast', 'Dry Goods & Pasta',
  'Bakery', 'Oils, Spices & Condiments'];

  constructor(private router : Router){
    this.router.events
          .subscribe(
            (event: any) => {
              if(event instanceof NavigationStart) {
                this.currentPage = event.url;
                this.Username = localStorage.getItem('Username');
                this.UserType = localStorage.getItem('User');
              }
            });
  }
  
  signOut(){
    localStorage.removeItem('User');
    localStorage.removeItem('Username');
    this.router.navigate(['landing']);
  }

  getAllOfType(type : string){
    this.router.navigate(['viewtypes'], {queryParams :{type : type}});
  }
}
