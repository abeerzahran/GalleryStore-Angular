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
 constructor(public ProductServ:ProductServicesService,public categoryService: CategoryService) {
  }
  ngOnInit(): void {


  }
}
