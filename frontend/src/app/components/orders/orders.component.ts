import { Component } from '@angular/core';
import { forkJoin, switchMap } from 'rxjs';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

  UserID : number;
  orders : any[] = [];
  orderDetails : any = [];
  observableList : any = [];

  constructor(private shoppingService : ShoppingService){}

  ngOnInit(){
    this.UserID = Number(localStorage.getItem('id'));
    this.getAllOrders();
  }

  getAllOrders(){
    this.shoppingService.getOrders(this.UserID)
    .pipe(switchMap ( data => {
      this.orders = data[0];
      console.log(this.orders);
      this.orders.forEach( (order) => {
        this.observableList.push(this.shoppingService.getOrderDetails(order.ID));
      })
      return forkJoin(this.observableList);
    }))
    .subscribe( data => {
      this.orderDetails = data;
      console.log(this.orderDetails);
    })
  }

}
