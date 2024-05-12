import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin } from '../Models/ILogin';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  apiUrl:string="http://localhost:5087/api";
  constructor(public httpClient:HttpClient) { }

  login(account:any){
    return this.httpClient.post<ILogin>(`${this.apiUrl}/login`,account);
  }

}
