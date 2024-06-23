import { OrderProductsService } from './Services/order-products.service';
import { AccountService } from './Services/account.service';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet,Router } from '@angular/router';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { SliderComponent } from './Components/slider/slider.component';
import { ProductsComponent } from './Components/products/products.component';
import { FooterComponent } from './Components/footer/footer.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { CartService } from './Services/cart.service';
import { log } from 'console';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,NavbarComponent,SliderComponent,ProductsComponent,FooterComponent,DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'GallaryProject';
  user:any={}
  cartNum:number=0
  constructor(public accountService:AccountService,public router:Router, public cartSer:CartService) {
  }
  ngOnInit(): void {
    this.accountService.getLoginedUser().subscribe({
      next:(value)=> {
        this.user=value
        if(value==false)
        {
          this.router.navigate(['/login'])
        }
      },
      error:(err)=> {
        console.log(err);
      },
    })

    this.cartSer.getCart().subscribe({
      next:(value)=> {
        this.cartNum=value.orderProducts.length;

      },
      error:(err)=> {
        console.log(err);

      },
    })

  }
  editCart(num:Event){
    console.log(num);
    this.cartNum+=Number(num);
  }

}
