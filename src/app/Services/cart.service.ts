import { ICart } from './../Models/ICart.1';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  apiUrl:string="http://localhost:5087/api/Orders";

  constructor(public httpClient:HttpClient) { }


  getCart()
  {
    const headers= new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("token")}`,
    });

    return this.httpClient.get<ICart>(this.apiUrl+"/cart",{headers});


  }
  updateCart(id:any,cart:any)
  {
    return this.httpClient.put(`${this.apiUrl}/${id}`,cart);
  }

  createOrder()
  {
    const order={
      checkOutDate: new Date(),
      quantity: 0,
      status: "c",
    }
    const headers=new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("token")}`,
    });
    return this.httpClient.post(this.apiUrl,order,{headers});
  }


}
