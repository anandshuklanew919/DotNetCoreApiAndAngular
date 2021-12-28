import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  quantity = 1;

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute,
    private bcService:BreadcrumbService , private basketService : BasketService) { }

  ngOnInit(): void {
    this.loadProduct()
  }

  addItemToBaskte()
  {
    this.basketService.addItemToBasket(this.product,this.quantity);
  }

  incrementQuantity()
  {
    this.quantity++;
  }
  decrementQuantity(){
    if(this.quantity>1){
      this.quantity--;
    }
    
  }

  loadProduct() {
    this.shopService.getProduct(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe(product=>{
      this.product = product;
      this.bcService.set('@productDetail',product.name);
    },error=>{
      console.log(error);
    });
  }

}
