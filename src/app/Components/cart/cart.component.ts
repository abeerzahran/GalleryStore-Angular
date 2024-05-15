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
  products:IProduct[]=[]
  totalOfProducts:number=0
  shipping:number=4.99;
  orderTotal:number=this.totalOfProducts+ this.shipping;

  constructor(public cartService: CartService, public productServ: ProductServicesService) {
  }
  ngOnInit(): void {
    this.cartService.getCart().subscribe({
      next:(cart)=> {
        this.totalOfProducts=cart.totalPrice;
        this.orderTotal=this.totalOfProducts+ this.shipping;
        this.Orderproducts=cart.orderProducts;

        this.Orderproducts.forEach((element:IOrderProducts) => {
          this.productServ.getProductByID(element.productId).subscribe({
            next:(value)=> {
              this.products.push(value);
            },
            error:(err)=>{
              console.log(err);
            },
          })
        });
        console.log(this.products);

      },
      error:(err)=> {
        console.log(err);
      },
    })
  }


}
