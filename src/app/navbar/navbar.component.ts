import { Component, OnInit, HostListener } from '@angular/core';
import { MobileScreenSize } from '../Infrastructure/Consts';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logoUrl = '/assets/logo.png';

  screenWidth: number;
  mobileScreenSize: number;

  constructor() { }

  @HostListener('window:resize', ['$event.target'])
  private onResize(e) {
    this.screenWidth = e.innerWidth;
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.mobileScreenSize = MobileScreenSize;
  }

}
