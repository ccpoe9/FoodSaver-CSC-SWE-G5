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
  Message : string = "";
  User : any[] = [];
  constructor(private authService : AuthService, private router : Router) { }

  loginAsCustomer(){
    this.userInfo = {
        "Username" : this.Username,
        "Password" : this.Password
    }
    this.authService.loginCustomer(this.userInfo)
    .subscribe( data => {
      if(data[0].length == 1){
        this.User = data[0];
        this.authService.setUser(this.User[0].ID, 'Customer', this.User[0].Username);
        this.Message = 'Login successful';
        this.router.navigate(['home']);
      }
      else{
        this.Message = "Username or Password is Incorrect";
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
      this.User = data[0];
      this.authService.setUser(this.User[0].ID, 'Customer', this.User[0].Username);
      this.router.navigate(['home']);
      this.Message = 'SignUp successful';
  }, (err) => {
    if(err.statusText.startsWith('SQL Error : ER_DUP_ENTRY:')) this.Message = "User already exists";
  });
  }

  loginAsAdmin(){
    this.userInfo = {
        "Username" : this.Username,
        "Password" : this.Password
    }
    this.authService.loginAdmin(this.userInfo)
    .subscribe( data => {
      if(data[0].length == 1){
        this.User = data[0];
        this.authService.setUser(this.User[0].ID, 'Admin', this.User[0].Username);
        this.router.navigate(['home']);
        this.Message = 'Login successful';
      }
      else{
        this.Message = "Username or Password is Incorrect";
      }
    });
  }

}
