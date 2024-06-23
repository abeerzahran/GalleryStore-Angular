import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin } from '../Models/ILogin';
import { IRegister } from '../Models/IRegister';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  apiUrl:string="http://localhost:5087/api";
  constructor(public httpClient:HttpClient) { }

  login(account:any){
    return this.httpClient.post<any>(`${this.apiUrl}/login`,account);
  }

  register(user:any){
    return this.httpClient.post<IRegister>(`${this.apiUrl}/register`,user);
  }

  getLoginedUser()
  {
    const headers =new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.httpClient.get(`${this.apiUrl}/Account/getLoggedinUser`,{headers});
  }

  logout(){
    return this.httpClient.get<any>(`${this.apiUrl}/logout`);
  }

}
