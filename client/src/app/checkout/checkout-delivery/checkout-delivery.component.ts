import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from 'src/app/basket/basket.service';
import { IDeliveryMethod } from 'src/app/shared/models/deliveryMethod';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit {

 @Input() checkoutForm:FormGroup;
 deliveryMethod:IDeliveryMethod[];

  constructor(private checkoutService:CheckoutService,private basketService : BasketService) { }

  ngOnInit(): void {
   this.checkoutService.getDeliveryMethod().subscribe(
      (dm:IDeliveryMethod[]) => {
        this.deliveryMethod = dm;
      }, error=> console.log(error));
  }

  setShippingPrice(deliveryMethod : IDeliveryMethod){
    this.basketService.setShippingPrice(deliveryMethod);
    console.log(deliveryMethod);
  }

}
