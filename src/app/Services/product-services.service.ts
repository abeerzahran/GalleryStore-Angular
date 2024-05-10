import { IProduct } from './../Models/IProduct';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServicesService {

  products:IProduct[]=[]
  apiURL:string="http://localhost:5087/api/products";
  constructor(public httpClient:HttpClient) { }

  getAllProducts():Observable<IProduct[]>{
    return this.httpClient.get<IProduct[]>(this.apiURL);
   }

   getProductByID(id:number):Observable<IProduct>{
    return this.httpClient.get<IProduct>(`${this.apiURL}/${id}`);
   }

   deleteProduct(id:number){
    // this.Products= this.Products.filter(r=> r.id != id);
    // return this.Products;
    return this.httpClient.delete(`${this.apiURL}/${id}`);
   }

   addProduct(Product:any){
    // Product.id=this.Products.length+1
    // this.Products.push(Product);
    // return this.Products;
    return this.httpClient.post(this.apiURL,Product);
   }

   editProduct(id:number , Product:any){
    // this.Products[id-1]=Product;
    // this.Products[id-1].id=id;
    // return this.Products;
    return this.httpClient.put(`${this.apiURL}/${id}`,Product);
   }
}
