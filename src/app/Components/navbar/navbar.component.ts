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
  ngOnChanges(changes: SimpleChanges): void {

      // console.log(changes['user'].currentValue)
      if(changes['user'].currentValue.roles)
        {
          this.admin= changes['user'].currentValue.roles.includes("admin");
        }
  }

  @Input()user:any={}
  admin:boolean=false
  cartNum:string|null=""

  ngOnInit(): void {
    this.cartNum=localStorage.getItem("cartNum");
  }

}
