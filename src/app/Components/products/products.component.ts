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
  categoryName:string="all"
  page:number=1
  pagesNumber:number=0
  pagesArray:number[]=[]
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
      next:(value)=> {
        this.pagesNumber= Math.ceil(value.length/6) ;
        for(var i=1;i<=this.pagesNumber;i++)
          {
            this.pagesArray.push(i);
          }
      },
    })

    this.ProductServ.getProductPage(1,"all").subscribe({
      next:(data)=>{
        console.log(data)
        this.products=data
      },
      error:(error)=>{
        console.log(error);
      }

    })
  }
  chooseCategory(e:any,id:number)
  {
    console.log(e.target.value)
    this.categoryName= e.target.value;

    this.ProductServ.getProductPage(1,this.categoryName).subscribe({
      next:(data)=>{
        console.log(data)
        this.products=data
      },
      error:(error)=>{
        console.log(error);
      }

    })



    if(this.categoryName=="all")
      {
        this.ProductServ.getAllProducts().subscribe({
          next:(value)=> {
            this.pagesNumber= Math.ceil(value.length/6) ;
            for(var i=1;i<=this.pagesNumber;i++)
              {
                this.pagesArray=[]
                this.pagesArray.push(i);
              }
          },
        })
      }
      else{
        this.categoryService.getProductsByCategory(id).subscribe({
          next:(value)=> {
            this.pagesNumber= Math.ceil(value.length/6) ;
            for(var i=1;i<=this.pagesNumber;i++)
              {
                this.pagesArray=[]
                this.pagesArray.push(i);
              }
          },
        })
      }

  }

  choosePage(page:number=1)
  {
    this.ProductServ.getProductPage(page,this.categoryName).subscribe({
      next:(data)=>{
        this.page=page;
        console.log(data)
        this.products=data
      },
      error:(error)=>{
        console.log(error);
      }

    })
  }

  nextPage(){

    if(this.page<this.pagesNumber)
      {
        this.page=this.page+1;
        this.choosePage(this.page)
      }
    console.log(this.pagesNumber);

  }

  prevPage(){

    if(this.page>1)
      {
        this.page=this.page-1;
        this.choosePage(this.page)
      }
    console.log(this.page);
  }





}
