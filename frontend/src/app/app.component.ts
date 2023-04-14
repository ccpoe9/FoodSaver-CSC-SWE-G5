import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FoodSaver.';

  currentPage : string;

  constructor(private router : Router, @Inject(DOCUMENT) private _document: any){
    this.router.events
          .subscribe(
            (event: any) => {
              if(event instanceof NavigationStart) {
                this.currentPage = event.url;
              }
            });
            ;
  }

  ngOnInit(){
    document.documentElement.setAttribute('data-bs-theme', localStorage.getItem('theme') || 'light');
  }

  ngOnDestroy(){
    localStorage.clear();
  }
}
