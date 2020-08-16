import { Component, OnInit } from '@angular/core';
import { AvailableDietsService } from '../available-diets.service';
import { Observable } from 'rxjs';
import { DietsSheetNames } from '../Models/DietsSheetNames';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-select-diet',
  templateUrl: './select-diet.component.html',
  styleUrls: ['./select-diet.component.css']
})
export class SelectDietComponent implements OnInit {

  availableDiets$: Observable<DietsSheetNames[]>

  selectedDiet: DietsSheetNames;

  constructor(
    private availableDietsService: AvailableDietsService
  ) { 
    this.availableDiets$ = availableDietsService.getAvailableDietList();
  }

  ngOnInit(): void {
  }

  resetCookieValue(event: MatSelectChange){
    this.availableDietsService.setCookie(event.value);
  }
}
