import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DietHarmonogramService } from '../diet-harmonogram.service';
import { DietHarmonogramModel } from '../Models/DietHarmonogramModel';
import { DayOfWeek } from '../Infrastructure/DayOfWeek';
import { NgForm } from '@angular/forms';
import { filter, switchMap, tap } from 'rxjs/operators';
import { Observable, from } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, AfterViewInit {

  public selectedDays$;
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
    // this.form.valueChanges.subscribe(x => {
    //   console.log(x);
    //   console.log(this.dietDays)
    // })
    this.selectedDays$ = this.form.valueChanges.pipe(
      tap(x => console.log('before switchMap', x)),
      switchMap(x => from(this.dietDays)),
      tap(x => console.log('after switchMap', x)),
      filter(x => x.isSelected)

    );
  }

}
