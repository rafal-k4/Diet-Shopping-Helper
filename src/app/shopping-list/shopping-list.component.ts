import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DietHarmonogramService } from '../diet-harmonogram.service';
import { DietHarmonogramModel } from '../Models/DietHarmonogramModel';
import { DayOfWeek } from '../Infrastructure/DayOfWeek';
import { NgForm } from '@angular/forms';
import { filter, switchMap, tap, map, flatMap, pairwise, delay } from 'rxjs/operators';
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
      delay(100),
      map(x => this.dietDays),
      map(x => {

        console.log(this.MapObject(x))
        return x[1]
      })
    )



    // this.form.valueChanges.pipe(
    //   switchMap(x => from(this.dietDays)),
    //   filter(x => x.isSelected),
    //   tap(x => console.log('after filter', x)),
    // ).subscribe(x => {
    //   this.selectedDays$ = x;
    // })
  }

  test(): void {
    console.log(this.dietDays);
  }

  private MapObject(input: DietHarmonogramModel[]): {day: string, isSelected: boolean}[] {
    const result = [];
    for (const iterator of input) {
      result.push({ day: DayOfWeek[iterator.Day], isSelected: iterator.isSelected })
    }
    //const result = { day: DayOfWeek[input.Day], isSelected: input.isSelected };
    //console.log(result);
    return result;
  }

}
