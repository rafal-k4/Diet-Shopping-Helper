import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  year: number;

  currentApplicationVersion: string;

  constructor() { }

  ngOnInit(): void {
    this.year = new Date().getFullYear();
    this.currentApplicationVersion = environment.appVersion;
  }

}
