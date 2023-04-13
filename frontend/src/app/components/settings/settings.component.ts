import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {


  userName : string;
  userType : string | null;
  userPhoneNumber : string;
  userEmail : string;
  userAddress : string;

  Message : string = "";

  editUserInfo = {
    Username : "",
    Email : "",
    Phone : "",
    Address : ""
  }

  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit(){
    this.userType = localStorage.getItem('user');
    this.getUserInfo();
  }

  getUserInfo(){
    this.authService.getUserInfo(Number(localStorage.getItem('id')))
    .subscribe( data => {
      this.userName = data[0].Username;
      this.userEmail = data[0].Email;
      this.userPhoneNumber = data[0].Phone;
      this.userAddress = data[0].Address;
      this.setUserInfo();
    })
  }
  setUserInfo(){
    this.editUserInfo.Username = this.userName;
    this.editUserInfo.Email = this.userEmail;
    this.editUserInfo.Phone = this.userPhoneNumber;
    this.editUserInfo.Address = this.userAddress;
  }
  submitUserInfo(){
    if(this.editUserInfo.Username == ''){
      this.Message = "Username is required";
    }
    else{
      this.authService.editUserInfo(Number(localStorage.getItem('id')), this.editUserInfo)
      .subscribe( data => {
        console.log(data);
        localStorage.setItem('username', this.editUserInfo.Username); 
        localStorage.setItem('address', this.editUserInfo.Address);
        this.Message = "";
        location.reload();
      }, (err) => {
        if(err.statusText.startsWith('SQL Error : ER_DUP_ENTRY:')) this.Message = "User already exists";
      })
    }
  }

}
