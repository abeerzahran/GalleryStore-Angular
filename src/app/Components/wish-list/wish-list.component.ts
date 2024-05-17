import { Component, OnInit } from '@angular/core';
import { FavouriteService } from '../../Services/FavouriteService';
import { IProduct } from '../../Models/IProduct';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent implements OnInit {
  products:any=[];
  constructor(public favouriteService : FavouriteService) {
  }

  ngOnInit(): void {
  this.favouriteService.getAllFavourites().subscribe
  (
    {
      next:(data)=>{
        console.log(data);
        this.products = data;
      }
    }
  )
  }
  Delete (id:number) {
    this.favouriteService.deleteProduct(id).subscribe({
      next: ()=>{
        console.log("deleted");
      }
    })
  }


}
