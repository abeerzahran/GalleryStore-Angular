import { AccountService } from './../../../Services/account.service';
import { FavouriteService } from './../../../Services/FavouriteService';
import { CartService } from './../../../Services/cart.service';
import { OrderProductsService } from './../../../Services/order-products.service';
import { CategoryService } from './../../../Services/category.service';
import { ProductServicesService } from './../../../Services/product-services.service';
import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../../Models/IProduct';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink,RouterLinkActive],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit {
  // products:IProduct[]=[]
  addedToCart:boolean=false
  cartNum:number=0
  @Input() product:any={}
  stars:number[]=[]

 constructor(
  public ProductServ:ProductServicesService,
  public categoryService: CategoryService,
  public orderProductsService: OrderProductsService,
  public cartService: CartService,
  public favouriteService:FavouriteService,
  public accountService:AccountService
 ) {}
  ngOnInit(): void {
    this.orderProductsService.getProductInCart(this.product.id).subscribe({
      next:(value)=> {
        if(value==null)
          this.addedToCart=false;
        else
          this.addedToCart=true;
          for(let i=0;i<this.product.rate;i++)
            {
              this.stars.push(i);
            }
      },

    })


 }
 cart:any={}
 orderProduct:any={}

 addToCart(product:any)
 {

    this.cartService.getCart().subscribe({
      next:(value)=> {
        // console.log(value)
        this.cart=value
        this.orderProduct={
          orderId: value.id,
          productId: product.id,
          quantity: 1
        }
        // console.log(this.orderProduct)
        this.orderProductsService.addOrderProduct(this.orderProduct).subscribe({
          next:(value)=> {
            // console.log(value)
            this.cart.totalPrice+=product.price;
            this.cart.quantity++;
            this.addedToCart=true;
            localStorage.setItem("cartNum",`${this.cart.quantity}`)


            this.cartService.updateCart(this.cart.id,this.cart).subscribe({
              next:(value)=> {
                console.log(value)
              },
              error(err) {
                console.log(err)
              },
            })
          },
          error:(err)=> {
            console.log(err)

          },
        })

      },
      error:(err)=> {
        console.log(err)
      },
    })
 }

 user:any={}
 addToFavourite(productId:any){
  // this.accountService.getLoginedUser().subscribe({
  //   next:(value)=> {
  //     console.log(value)
  //     this.user=value

  //   },
  //   error:(err)=> {
  //     console.log(err)
  //   },
  // })

  this.favouriteService.addProduct(productId).subscribe({
    next:(value)=> {
      console.log(value)
    },
    error:(err)=> {
      console.log(err)
    },
  })


}
}
