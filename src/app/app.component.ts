import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'diet-shopping-helper';
  screenWidth: number;

  @HostListener('window:resize', ['$event.target'])
  onResize(e) {
    this.screenWidth = e.innerWidth;
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    console.log(window.screen.width, window.innerWidth);
  }
}
