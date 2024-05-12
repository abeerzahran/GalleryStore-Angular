import { ProductServicesService } from './../../Services/product-services.service';
import { CategoryService } from './../../Services/category.service';
import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from './product-card/product-card.component';
import { ICategory } from '../../Models/ICategory';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../Models/IProduct';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent,CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  categories:ICategory[]=[]
  categoryId:number=0
  products:IProduct[]=[]
  constructor(public categoryService: CategoryService, public ProductServ: ProductServicesService) {


  }
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next:(value)=> {
        console.log(value);
         this.categories=value;
      },
      error:(err)=> {
        console.log(err);
      },
    })

    this.ProductServ.getAllProducts().subscribe({
      next:(data)=>{
        console.log(data)
        this.products=data
      },
      error:(error)=>{
        console.log(error);
      }

    })
  }
  chooseCategory(e:any)
  {
    console.log(e.target.value)
    this.categoryId= e.target.value;
    if(this.categoryId==0)
      {
        this.ProductServ.getAllProducts().subscribe({
          next:(data)=>{
            console.log(data)
            this.products=data
          },
          error:(error)=>{
            console.log(error);
          }

        })
      }
      else
      {
        this.categoryService.getProductsByCategory(this.categoryId).subscribe({
          next:(data)=>{
            console.log(data)
            this.products=data
          },
          error:(error)=>{
            console.log(error);
          }

        })
      }



  }







}
