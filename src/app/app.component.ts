import { Component, OnInit, HostListener } from '@angular/core';
import { MobileScreenSize } from './Infrastructure/Consts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'diet-shopping-helper';
  screenWidth: number;
  mobileScreenSize: any;

  @HostListener('window:resize', ['$event.target'])
  private onResize(e) {
    this.screenWidth = e.innerWidth;
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.mobileScreenSize = MobileScreenSize;
  }
}
