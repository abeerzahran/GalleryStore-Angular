import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-registiration',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './registiration.component.html',
  styleUrl: './registiration.component.css'
})
export class RegistirationComponent {

  FormGroup = new FormGroup 
  (
    {
      userName : new FormControl("",[Validators.required,Validators.minLength(8)]),
      email : new FormControl("",[Validators.required,Validators.email]),
      password : new FormControl("",[Validators.required,Validators.minLength(8)]),
      confirmedPassword : new FormControl("",[Validators.required,Validators.minLength(8)]),
      phoneNumber : new FormControl(null,[Validators.required,Validators.minLength(8)]),
      address: new FormControl("",[Validators.required,Validators.minLength(8)]),
    }
  )

  get getEmail()
  {
    return this.FormGroup.controls['email'];
  }

  get getName()
  {
    return this.FormGroup.controls['userName'];
  }

  get getPassword()
  {
    return this.FormGroup.controls['password'];
  }

  get getConfirmPassword()
  {
    return this.FormGroup.controls['confirmedPassword']
  }

  get getPhoneNumber()
  {
    return this.FormGroup.controls['phoneNumber'];
  }

  get getAddress()
  {
    return this.FormGroup.controls['address'];
  }

  userHandler()
  {
    
  }

}
