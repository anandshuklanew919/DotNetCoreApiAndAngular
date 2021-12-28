import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../shared/models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
 basket$: Observable<IBasket>;
  constructor(private basketService: BasketService) { 
  }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  removeBasketItem(Item:IBasketItem)
  {
    this.basketService.removeItemFromBasket(Item);
  }

  incrementItemQuantity(item:IBasketItem){
    this.basketService.incrementItemQuantity(item);
  }

  decrementItemQuantity(item:IBasketItem){
    this.basketService.decrementItemQuantity(item);
  }

}
