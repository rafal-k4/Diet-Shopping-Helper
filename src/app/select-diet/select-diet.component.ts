import { Component, OnInit } from '@angular/core';
import { AvailableDietsService } from '../available-diets.service';
import { Observable } from 'rxjs';
import { DietsSheetNames } from '../Models/DietsSheetNames';

@Component({
  selector: 'app-select-diet',
  templateUrl: './select-diet.component.html',
  styleUrls: ['./select-diet.component.css']
})
export class SelectDietComponent implements OnInit {

  availableDiets$: Observable<DietsSheetNames[]>

  constructor(
    private availableDiets: AvailableDietsService
  ) { 
    this.availableDiets$ = availableDiets.getAvailableDietList();
  }

  ngOnInit(): void {
  }

}
