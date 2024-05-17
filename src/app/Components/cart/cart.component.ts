import { OrderProductsService } from './../../Services/order-products.service';
import { ProductServicesService } from './../../Services/product-services.service';
import { ICart } from '../../Models/ICart.1';
import { CartService } from './../../Services/cart.service';
import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../Models/IProduct';
import { IOrderProducts } from '../../Models/IOrderProducts';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  Orderproducts:any=[]
  orderProductslist:any[]=[]
  totalOfProducts:number=0
  shipping:number=4.99;
  orderTotal:number=this.totalOfProducts+ this.shipping;

  cart:any={}

  constructor(public cartService: CartService, public productServ: ProductServicesService, public orderProductsService:OrderProductsService) {
  }
  ngOnInit(): void {
    this.loadProducts()
  }

  loadProducts()
  {
    this.cartService.getCart().subscribe({
      next:(cart)=> {
        if(cart==null)
        {
          this.cartService.createOrder().subscribe({
            next:(value)=> {
              console.log(value)
              this.cart=value;
            },
            error:(err)=> {
              console.log(err);
            },
          })
        }
        else
        {
          this.cart=cart;
        }

        this.totalOfProducts=cart.totalPrice;
        this.orderTotal=this.totalOfProducts+ this.shipping;
        this.Orderproducts=cart.orderProducts;

        this.Orderproducts.forEach((element:IOrderProducts) => {
          this.productServ.getProductByID(element.productId).subscribe({
            next:(value)=> {
              this.orderProductslist.push({orderProduct:element,product:value});
            },
            error:(err)=>{
              console.log(err);
            },
          })
        });


      },
      error:(err)=> {
        console.log(err);
      },
    })
  }



  increase(item:any){
    if(item.product.quantity>item.orderProduct.quantity)
    {
      item.orderProduct.quantity++;
      // console.log(item.orderProduct)
      this.orderProductsService.updateOrderProduct(item.orderProduct).subscribe({
        next:(data)=>{
          item.orderProduct=data;
          this.cart.totalPrice+=item.product.price;
          this.totalOfProducts=this.cart.totalPrice;
          this.orderTotal=this.totalOfProducts+this.shipping;
          this.cartService.updateCart(this.cart.id,this.cart).subscribe({
            next:(value)=> {
              console.log(this.cart.id);
            },
            error:(err)=> {
              console.log(err)
            },
          })
        },
        error:(err)=> {
          console.log(err);
        },

      })
    }

    // console.log(item.orderProduct.quantity)
  }

  decrease(item:any){
    if(item.orderProduct.quantity>1)
    {
      item.orderProduct.quantity--;
      // console.log(item.orderProduct)
      this.orderProductsService.updateOrderProduct(item.orderProduct).subscribe({
        next:(data)=>{
          item.orderProduct=data;

          this.cart.totalPrice-=item.product.price;
          this.totalOfProducts=this.cart.totalPrice;
          this.orderTotal=this.totalOfProducts+this.shipping;
          this.cartService.updateCart(this.cart.id,this.cart).subscribe({
            next:(value)=> {
              console.log(this.cart.id);
            },
            error:(err)=> {
              console.log(err)
            },
          })
          // console.log(data);
        },
        error:(err)=> {
          console.log(err);
        },

      })
    }

    console.log(item.orderProduct.quantity)
  }

  delete(item:any)
  {
    this.orderProductsService.deleteOrderProduct(item.orderProduct).subscribe({
      next:(value)=>{
        console.log(item.orderProduct)
        this.orderProductslist.filter(p=> p.orderProduct.productId!= item.orderProduct.productId);
        console.log(this.orderProductslist)
        // console.log(value)
      },
      error:(err)=> {
        console.log(err)
      },
    })
  }


}
