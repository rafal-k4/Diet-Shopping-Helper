import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DietHarmonogramService } from '../diet-harmonogram.service';
import { DietHarmonogramModel } from '../Models/DietHarmonogramModel';
import { DayOfWeek } from '../Infrastructure/DayOfWeek';
import { NgForm } from '@angular/forms';
import { map, delay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProductModel } from '../Models/ProductModel';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, AfterViewInit {

  public selectedDays$: Observable<DietHarmonogramModel[]>;
  public combinedProducts$: Observable<ProductModel[]>;
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

    this.selectedDays$ = this.form.valueChanges.pipe(
      delay(1), // delay(1) is neccessary because The valueChanges event fires
                // immediately after the new value is updated but before the change is bubbled up to its parent
                // without delay(1), dietDays is holding previous value
      map(x => this.dietDays),
      map(x => x.filter(y => y.isSelected))
    );

    this.combinedProducts$ = this.selectedDays$.pipe(
      map(x => {



        return [new ProductModel()];
      })
    )

  }

}
