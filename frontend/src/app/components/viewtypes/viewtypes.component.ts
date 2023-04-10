import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewtypes',
  templateUrl: './viewtypes.component.html',
  styleUrls: ['./viewtypes.component.scss']
})
export class ViewtypesComponent {

  constructor(private route : ActivatedRoute){}

  type : string;

  ngOnInit(){
    this.route.queryParams.subscribe( data => {
      this.type = data['type'];
    });
  }
}
