import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DietHarmonogramService } from '../diet-harmonogram.service';
import { DietHarmonogramModel } from '../Models/DietHarmonogramModel';
import { DayOfWeek } from '../Infrastructure/DayOfWeek';
import { NgForm } from '@angular/forms';
import { filter, switchMap, tap, map, flatMap } from 'rxjs/operators';
import { Observable, from, of } from 'rxjs';
import { fileURLToPath } from 'url';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, AfterViewInit {

  public selectedDays$: Observable<DietHarmonogramModel[]>;
  public days = DayOfWeek;
  public dietDays: DietHarmonogramModel[];
  @ViewChild('dietDaysForm') form: NgForm;


  constructor(private dietHarmonogramService: DietHarmonogramService) { }

  ngOnInit(): void {
    this.dietHarmonogramService.getDietHarmonogramData({ fillRelatedObjects: true }).subscribe(x => {
      this.dietDays = x;
    });

  }

  ngAfterViewInit(): void {
    // console.log(this.form.valueChanges);
    this.selectedDays$ = this.form.valueChanges.pipe(
      map(x => this.dietDays),
      map(x => x.filter(y => {
        console.log(y.Day, y.isSelected)
        return y.isSelected}))
    )

    // this.form.valueChanges.pipe(
    //   switchMap(x => from(this.dietDays)),
    //   filter(x => x.isSelected),
    //   tap(x => console.log('after filter', x)),
    // ).subscribe(x => {
    //   this.selectedDays$ = x;
    // })
  }

}
