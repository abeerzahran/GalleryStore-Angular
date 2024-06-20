import { CartService } from './../../Services/cart.service';
import { Component, OnInit } from '@angular/core';
import { FavouriteService } from '../../Services/FavouriteService';
import { IProduct } from '../../Models/IProduct';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { error } from 'node:console';
import { OrderProductsService } from '../../Services/order-products.service';


@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [RouterLink  ],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent implements OnInit {
  products:any=[];
  cart: any;
  orderProduct: any;
  addedToCart: any;

  constructor(
    public favouriteService : FavouriteService,
    public orderProductsService: OrderProductsService,
    public cartService:CartService
  ) {
  }

  ngOnInit(): void {
  this.favouriteService.getAllFavourites().subscribe
  (
    {
      next:(data)=>{
        console.log(data);
        this.products = data;
      }
    }
  )
  }
  Delete (id:number) {
    this.favouriteService.deleteProduct(id).subscribe({
      next: ()=>{
        console.log("deleted");
        this.products= this.products.filter((p:any) => p.id != id);
      }
    })
  }

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



}
