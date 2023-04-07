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
  
  constructor(private router : Router){
    this.router.events
          .subscribe(
            (event: any) => {
              if(event instanceof NavigationStart) {
                this.currentPage = event.url;
                console.log(this.currentPage);
                this.Username = localStorage.getItem('Username');
                this.UserType = localStorage.getItem('User');
              }
            });
  }

  ngOnInit(){
    
  }
  
  signOut(){
    localStorage.removeItem('User');
    localStorage.removeItem('Username');
    this.router.navigate(['landing']);
  }
}
