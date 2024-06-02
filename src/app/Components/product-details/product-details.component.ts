import { ProductServicesService } from './../../Services/product-services.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(public activatedRoute:ActivatedRoute, public ProductServ:ProductServicesService) {


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



}
