import { Component, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

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

  selectedTheme : string;
  unselectedTheme : string;

  Message : string = "";

  editUserInfo = {
    Username : "",
    Email : "",
    Phone : "",
    Address : ""
  }

  constructor(private authService : AuthService, private router : Router, @Inject(DOCUMENT) private _document: any) { }

  ngOnInit(){
    this.userType = localStorage.getItem('user');
    if(localStorage.getItem('theme') == 'dark'){
      
      this.selectedTheme = 'DARK THEME';
      this.unselectedTheme = 'LIGHT THEME';
    }
    else{
      this.selectedTheme = 'LIGHT THEME';
      this.unselectedTheme = 'DARK THEME';
    }
    this.getUserInfo();
  }

  getUserInfo(){
    this.authService.getUserInfo(Number(localStorage.getItem('id')))
    .subscribe( data => {
      this.userName = data[0].Username;
      if(this.userName == 'null') this.userName = "";
      this.userEmail = data[0].Email;
      if(this.userEmail == 'null') this.userEmail = "";
      this.userPhoneNumber = data[0].Phone;
      if(this.userPhoneNumber == 'null') this.userPhoneNumber = "";
      this.userAddress = data[0].Address;
      if(this.userAddress == 'null') this.userAddress = "";
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

  changeTheme(newTheme : string){
    this.unselectedTheme = this.selectedTheme;
    this.selectedTheme = newTheme;
    if(newTheme == 'LIGHT THEME') {
      document.documentElement.setAttribute('data-bs-theme','light');
      localStorage.setItem('theme','light');
      location.reload();
    }
    if(newTheme == 'DARK THEME'){
      document.documentElement.setAttribute('data-bs-theme','dark');
      localStorage.setItem('theme','dark');
      location.reload();
    }
  }

}
