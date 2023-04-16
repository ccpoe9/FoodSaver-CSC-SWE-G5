import { Component, EventEmitter, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription, subscribeOn } from 'rxjs';
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
  UserEmail : string;
  UserPhoneNumber : string;

  search : string;
  theme : string;
  productTypes = ['Produce', 'Dairy & Eggs', 'Meat & Seafood', 
  'Beverages', 'Snacks', 'Prepared Food', 'Breakfast', 'Dry Goods & Pasta',
  'Bakery', 'Oils, Spices & Condiments'];


  editUserInfo = {
    Username : "",
    Email : "",
    Phone : "",
    Address : ""
  }

  Message : string;

  shoppingSessions : any[] = [];
  subscription : Subscription;
  totalCartCount : number;
  constructor(private router : Router, private shoppingService : ShoppingService, private authService : AuthService){
    this.router.events
          .subscribe(
            (event: any) => {
              if(event instanceof NavigationStart) {
                this.currentPage = event.url;
                this.getLocalStorage();
                this.getShoppingSessions();
              }
            });
  }

  


  ngOnInit(){ 
    this.subscription = this.shoppingService.totalItems$
    .subscribe( data => {
      this.totalCartCount = data;
    })
  }

  getLocalStorage(){
    this.Username = localStorage.getItem('username');
    this.UserType = localStorage.getItem('user');
    this.UserID = Number(localStorage.getItem('id'));
    this.theme = localStorage.getItem('theme') || 'light';
    this.UserAddress = localStorage.getItem('address');
    if(this.UserAddress == 'null' || this.UserAddress == '') this.UserAddress = "Enter Your Address";
  }

  getUserInfo(){
    this.authService.getUserInfo(Number(localStorage.getItem('id')))
    .subscribe( data => {
      this.Username = data[0].Username;
      this.UserEmail = data[0].Email;
      this.UserPhoneNumber = data[0].Phone;
      this.UserAddress = data[0].Address;
      console.log(this.UserAddress);
      if(this.UserAddress == null || this.UserAddress == '') this.UserAddress = "Enter Your Address";
      this.setUserInfo();
    })
  }
  setUserInfo(){
    this.editUserInfo.Username = this.Username || '';
    this.editUserInfo.Email = this.UserEmail || '';
    this.editUserInfo.Phone = this.UserPhoneNumber || '';
  }

  submitUserInfo(){
    console.log(this.editUserInfo);
    if(this.editUserInfo.Username == ''){
      this.Message = "Username is required";
    }
    else{
      this.authService.editUserInfo(Number(localStorage.getItem('id')), this.editUserInfo)
      .subscribe( data => {
        localStorage.setItem('username', this.editUserInfo.Username); 
        localStorage.setItem('address', this.editUserInfo.Address);
        this.Message = "";
        location.reload();
      })
    }
  }

  signOut(){
    this.router.navigate(['landing']);
  }

  getAllOfType(type : string){
    this.router.navigate(['viewtypes'], {queryParams :{type : type}});
  }

  searchProducts(){
    this.router.navigate(['search'], {queryParams : {s : this.search}});
  }

  getShoppingSessions(){
    this.shoppingService.getShoppingSessions(this.UserID)
    .subscribe( data => {
      this.shoppingSessions = data[0];
      this.shoppingSessions.forEach( (session : any) => {
        this.totalCartCount+=session.CartCount;
      })
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
