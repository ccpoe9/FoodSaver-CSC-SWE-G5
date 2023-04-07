import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  Username : string;
  Password : string;
  userInfo = {};
  ErrorMessage : string = "";

  constructor(private authService : AuthService, private router : Router) { }

  loginAsCustomer(){
    this.userInfo = {
        "Username" : this.Username,
        "Password" : this.Password
    }
    this.authService.loginCustomer(this.userInfo)
    .subscribe( data => {
      if(data.length == 1){
        localStorage.setItem('User', 'Customer');
        localStorage.setItem('Username', data[0].Username);
        this.router.navigate(['home']);
        this.ErrorMessage = "";
      }
      else{
        this.ErrorMessage = "Username or Password is Incorrect";
      }
    });
  }
  signUpAsCustomer(){
    this.userInfo = {
      "Username" : this.Username,
      "Password" : this.Password
  }
  this.authService.signUpCustomer(this.userInfo)
  .subscribe( data => {
      localStorage.setItem('User', 'Customer');
      localStorage.setItem('Username', this.Username);
      this.router.navigate(['home']);
  });
  }

  loginAsAdmin(){
    this.userInfo = {
        "Username" : this.Username,
        "Password" : this.Password
    }
    this.authService.loginAdmin(this.userInfo)
    .subscribe( data => {
      if(data.length == 1){
        localStorage.setItem('User', 'Admin');
        localStorage.setItem('Username', data[0].Username);
        this.router.navigate(['home']);
        this.ErrorMessage = "";
      }
      else{
        this.ErrorMessage = "Username or Password is Incorrect";
      }
    });
  }

}
