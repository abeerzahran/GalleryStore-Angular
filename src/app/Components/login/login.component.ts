import { routes } from './../../app.routes';
import { CommonModule } from '@angular/common';
import { ILogin } from './../../Models/ILogin';
import { AccountService } from './../../Services/account.service';
import { Component } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

constructor(public accService:AccountService ,public route:Router,public activatedRoute:ActivatedRoute){}

 loginform = new FormGroup({
  email: new FormControl('',[Validators.required]),
  password: new FormControl('',[Validators.required]),
  rememberMe: new FormControl(false)
 });

 getEmail(){
  return this.loginform.controls["email"]
 }
 getPassword(){
  return this.loginform.controls["password"]
 }
 getRememberMe(){
  return this.loginform.controls["rememberMe"]
 }



 signin()
 {

  this.accService.login(this.loginform.value).subscribe({
    next(data) {

      console.log(data);
    },
    error(err) {
      console.log(err);
    },
  })
  this.route.navigate(['/']);
 }

}
