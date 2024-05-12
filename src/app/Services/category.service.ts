import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../Models/IProduct';
import { ICategory } from '../Models/ICategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl:string="http://localhost:5087/api/categories"
  constructor(public httpClient:HttpClient) { }

  getProductsByCategory(id:number)
   {
    return this.httpClient.get<IProduct[]>(`${this.apiUrl}/categoryProducts/${id}`);
   }

   getCategories()
   {
    return this.httpClient.get<ICategory[]>(`${this.apiUrl}`);
   }
}
