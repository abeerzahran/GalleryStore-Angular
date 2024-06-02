import { routes } from './../../app.routes';
import { CommonModule } from '@angular/common';
import { ILogin } from './../../Models/ILogin';
import { AccountService } from './../../Services/account.service';
import { Component } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router,ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

constructor(public accService:AccountService ,public route:Router,public activatedRoute:ActivatedRoute){}

 loginform = new FormGroup({
  email: new FormControl('',[Validators.required,Validators.email]),
  password: new FormControl('',[Validators.required]),
  rememberMe: new FormControl(false)
 });

get getEmail(){
  return this.loginform.controls["email"]
 }
get getPassword(){
  return this.loginform.controls["password"]
 }
get getRememberMe(){
  return this.loginform.controls["rememberMe"]
 }


 token:string=""
 signin()
 {
  if(this.loginform.valid){
    this.accService.login(this.loginform.value).subscribe({
      next:(data)=> {
        this.token=data.token;
        localStorage.setItem("token",this.token);
        localStorage.setItem("cartNum","0");
      },
      error(err) {
        console.log(err);
      },
    })
    this.route.navigate(['/']);
 }
}

}
