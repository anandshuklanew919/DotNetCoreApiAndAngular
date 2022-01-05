import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {IDeliveryMethod} from '../shared/models/deliveryMethod';
import { IOrder, IOrderToCreate } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

baseUrl = environment.apiUrl;

  constructor(private httpClient:HttpClient) { }

  createOrder(order:IOrderToCreate){
    return this.httpClient.post(this.baseUrl+'orders', order);
  }

  getDeliveryMethod(){
    return this.httpClient.get(this.baseUrl + 'orders/deliveryMethods').pipe(
      map((dm:IDeliveryMethod[])=>{
        return dm.sort((a,b)=>b.price-a.price);
      })
    );
  }
}
