import { AccountService } from './../../Services/account.service';
import { NgIf } from '@angular/common';
import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnChanges{

  constructor(public accountService:AccountService) {


  }

  ngOnChanges(changes: SimpleChanges): void {

      // console.log(changes['user'].currentValue)
      if(changes['user']?.currentValue.roles)
        {
          this.admin= changes['user'].currentValue.roles.includes("admin");
        }
  }

  @Input()user:any={}
  @Input()cartNum:number|null=0
  admin:boolean=false

  ngOnInit(): void {
    // this.cartNum=localStorage.getItem("cartNum");
  }

  logout(){
    this.accountService.logout().subscribe({
      next:(value)=>{
        console.log(value);
        localStorage.setItem("token","")
        location.reload();

      },
      error:(err)=>{
        console.log(err);

      },
    })
  }
}
