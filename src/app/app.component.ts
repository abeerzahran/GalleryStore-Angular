import { AccountService } from './Services/account.service';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet,Router } from '@angular/router';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { SliderComponent } from './Components/slider/slider.component';
import { ProductsComponent } from './Components/products/products.component';
import { FooterComponent } from './Components/footer/footer.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';


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
  constructor(public accountService:AccountService,public router:Router) {
  }
  ngOnInit(): void {
    this.accountService.getLoginedUser().subscribe({
      next:(value)=> {
        this.user=value
        if(value==false)
        {
          this.router.navigate(['/login'])
        }
        console.log(this.user);
      },
      error:(err)=> {
        console.log(err);

      },
    })
  }



}
