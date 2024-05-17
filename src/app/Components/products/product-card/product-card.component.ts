import { CartService } from './../../../Services/cart.service';
import { OrderProductsService } from './../../../Services/order-products.service';
import { CategoryService } from './../../../Services/category.service';
import { ProductServicesService } from './../../../Services/product-services.service';
import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../../Models/IProduct';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit {
  products:IProduct[]=[]
  @Input() product:any={}
 constructor(public ProductServ:ProductServicesService,public categoryService: CategoryService,public orderProductsService: OrderProductsService
  ,public cartService: CartService
 ) {}
  ngOnInit(): void {

 }
 cart:any={}
 orderProduct:any={}

 addToCart(product:any)
 {

    this.cartService.getCart().subscribe({
      next:(value)=> {
        console.log(value)
        this.cart=value
        this.orderProduct={
          orderId: value.id,
          productId: product.id,
          quantity: 1
        }
        console.log(this.orderProduct)
        this.orderProductsService.addOrderProduct(this.orderProduct).subscribe({
          next:(value)=> {
            console.log(value)
            this.cart.totalPrice+=product.price;
            this.cart.quantity++;
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
