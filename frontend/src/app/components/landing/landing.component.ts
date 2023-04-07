import { Component } from '@angular/core';
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

  constructor(private authService : AuthService) { }

  loginAsCustomer(){
    this.userInfo = {
        "Username" : this.Username,
        "Password" : this.Password
    }
    this.authService.loginCustomer(this.userInfo)
    .subscribe( data => {
      console.log(data.length);
    });
  }
  signUpAsCustomer(){
    
  }

}
