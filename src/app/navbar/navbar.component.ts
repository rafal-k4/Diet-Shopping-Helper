import { Component, OnInit, HostListener } from '@angular/core';
import { MobileScreenSize } from '../Infrastructure/Consts';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  mobileScreenSize: number;

  isMobileScreenSize: boolean;

  constructor() { }

  ngOnInit(): void {
    this.mobileScreenSize = MobileScreenSize;
    this.isMobileScreenSize =  this.checkIfIsMobileSizeScreen(window.innerWidth);

  }
  @HostListener('window:resize', ['$event.target'])
  private onResize(e) {
    this.isMobileScreenSize = this.checkIfIsMobileSizeScreen(e.innerWidth);
  }

  private checkIfIsMobileSizeScreen(innerWidth: any): boolean {
    return innerWidth < this.mobileScreenSize;
  }



}
