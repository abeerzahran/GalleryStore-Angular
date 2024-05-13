import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin } from '../Models/ILogin';
import { IRegister } from '../Models/IRegister';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  apiUrl:string="https://localhost:7054/api";
  constructor(public httpClient:HttpClient) { }

  login(account:any){
    return this.httpClient.post<ILogin>(`${this.apiUrl}/login`,account);
  }

  register(user:any){
    return this.httpClient.post<IRegister>(`${this.apiUrl}/register`,user);
  }

}
