import { AccountService } from './account.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFavourite } from '../Models/IFavourite';
import { IProduct } from '../Models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  // products:IFavourite[]=[]
  apiURL:string="http://localhost:5087/api/Favourites";
  userId:any ={}
   data:any={}
   headers =new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });
  constructor(public httpClient:HttpClient ,public accountService: AccountService) { }

  getAllFavourites(){


    return this.httpClient.get(`${this.apiURL}/getByUserId`,{headers:this.headers});
   }

  //  getProductByID(id:number):Observable<IFavourite>{
  //   return this.httpClient.get<IFavourite>(`${this.apiURL}/${id}`);
  //  }

  //  deleteProduct(id:number){
  //   // this.Products= this.Products.filter(r=> r.id != id);
  //   // return this.Products;
  //   return this.httpClient.delete(`${this.apiURL}/${id}`);
  //  }

   addProduct(productId:any){

        this.data = {
          productId: Number(productId)
        };

    return this.httpClient.post(this.apiURL,this.data,{headers:this.headers});
   }

  //  editProduct(id:number , Product:any){
  //   // this.Products[id-1]=Product;
  //   // this.Products[id-1].id=id;
  //   // return this.Products;
  //   return this.httpClient.put(`${this.apiURL}/${id}`,Product);
  //  }

  deleteProduct (productId:number){

    // this.accountService.getLoginedUser().subscribe({
    //   next:(value)=> {
    //     console.log(value)
    //     this.userId=value
    //     this.data = {
    //       userId: this.userId.userId,
    //       productId: Number(productId)
    //     };

    //     console.log(this.data)
    //   },
    // })

    const headers =new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.httpClient.delete( `${this.apiURL}`, {
      body: {productId:productId},
      headers:headers

  })
   }



}
