import { Component, OnInit } from '@angular/core';
import { ProductServicesService } from '../../Services/product-services.service';
import { IProduct } from '../../Models/IProduct';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  products:IProduct[]=[];
  constructor(public productsSer:ProductServicesService) {
  }

  ngOnInit(): void {
    this.productsSer.getAllProducts().subscribe({
      next:(data)=>{
        this.products=data;
      }
    })
  }

  delete(id:any){
    console.log(id)
    // this.products=
    this.productsSer.deleteProduct(id).subscribe({
      next:()=>{
        this.products=this.products.filter(p=> p.id!=id);
      }
    })
  }
}
