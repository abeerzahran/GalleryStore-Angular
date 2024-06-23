import { ProductServicesService } from './../../Services/product-services.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../Services/cart.service';
import { OrderProductsService } from '../../Services/order-products.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  productId:any=0
  product:any={}
  orderProduct:any
  cart:any
  addedToCart:string=""

  constructor(public activatedRoute:ActivatedRoute, public ProductServ:ProductServicesService, public cartService:CartService, public orderProductsService:OrderProductsService) {


  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next:(params)=>{
        this.productId=params['id'];
        this.ProductServ.getProductByID(this.productId).subscribe({
          next:(value)=>{
            this.product=value
            console.log(this.product)
          },
          error(err) {
            console.log(err)
          },
        })

      },
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

         this.orderProductsService.getProductInCart(product.id).subscribe({
           next:(value)=> {
             if(value==null)
               {
                 this.addedToCart="Added Successfully";
                 this.orderProductsService.addOrderProduct(this.orderProduct).subscribe({
                   next:(value)=> {
                     // console.log(value)
                     this.cart.totalPrice+=product.price;
                     this.cart.quantity++;
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
               }
               else{
                 this.addedToCart="The product is already added"
               }
           },
         })
         // console.log(this.orderProduct)


       },
       error:(err)=> {
         console.log(err)
       },
     })
  }



}
