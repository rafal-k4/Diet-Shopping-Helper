import { Component, OnInit } from '@angular/core';
import { AvailableDietsService } from '../available-diets.service';
import { Observable, forkJoin } from 'rxjs';
import { DietsSheetNames } from '../Models/DietsSheetNames';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-select-diet',
  templateUrl: './select-diet.component.html',
  styleUrls: ['./select-diet.component.css']
})
export class SelectDietComponent implements OnInit {

  availableDiets$: Observable<DietsSheetNames[]>

  selectedDietId: string;

  constructor(
    private availableDietsService: AvailableDietsService
  ) {
    this.availableDiets$ = availableDietsService.getAvailableDietList();

    availableDietsService.getSelectedDietName()
      .subscribe(x => {
        this.selectedDietId = x;
      });

  }

  ngOnInit(): void {
  }

  changeSelectedDiet(event: MatSelectChange) {
    console.log(`#1 from changeSelectedDiet function: ${event.value}`);

  }

  selected(value: string): void {
    console.log(`#2 from selected function: ${value}`);
    this.availableDietsService.setCookie(value);
  }
}
