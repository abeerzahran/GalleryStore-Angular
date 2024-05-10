import { Component, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {



}
