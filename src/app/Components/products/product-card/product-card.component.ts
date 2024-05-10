import { ProductServicesService } from './../../../Services/product-services.service';
import { Component, OnInit } from '@angular/core';
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
 constructor(public ProductServ:ProductServicesService) {
  }
  ngOnInit(): void {
    this.ProductServ.getAllProducts().subscribe({
      next:(data)=>{
        this.products=data
      },
      error:(error)=>{
        console.log(error);
      }

    })
  }
}
