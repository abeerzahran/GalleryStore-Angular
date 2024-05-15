import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFavourite } from '../Models/IFavourite';
import { IProduct } from '../Models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  // products:IFavourite[]=[]
  apiURL:string="https://localhost:7054/api/Favourites";
  constructor(public httpClient:HttpClient) { }

  getAllFavourites(){
    return this.httpClient.get(`${this.apiURL}/getByUserId`);
   }

  //  getProductByID(id:number):Observable<IFavourite>{
  //   return this.httpClient.get<IFavourite>(`${this.apiURL}/${id}`);
  //  }

  //  deleteProduct(id:number){
  //   // this.Products= this.Products.filter(r=> r.id != id);
  //   // return this.Products;
  //   return this.httpClient.delete(`${this.apiURL}/${id}`);
  //  }

  //  addProduct(Product:any){
  //   // Product.id=this.Products.length+1
  //   // this.Products.push(Product);
  //   // return this.Products;
  //   return this.httpClient.post(this.apiURL,Product);
  //  }

  //  editProduct(id:number , Product:any){
  //   // this.Products[id-1]=Product;
  //   // this.Products[id-1].id=id;
  //   // return this.Products;
  //   return this.httpClient.put(`${this.apiURL}/${id}`,Product);
  //  }


}
