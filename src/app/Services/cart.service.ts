import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ICart } from '../Models/ICart.1';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  apiUrl:string="http://localhost:5087/api/Orders/cart";

  constructor(public httpClient:HttpClient) { }


  getCart()
  {
    const headers= new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("token")}`,
    });
    return this.httpClient.get<ICart>(this.apiUrl,{headers});
  }
}
