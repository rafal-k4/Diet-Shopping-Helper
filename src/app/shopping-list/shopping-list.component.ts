import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DietHarmonogramService } from '../diet-harmonogram.service';
import { DietHarmonogramModel } from '../Models/DietHarmonogramModel';
import { DayOfWeek } from '../Infrastructure/DayOfWeek';
import { NgForm } from '@angular/forms';
import { map, delay, flatMap, shareReplay } from 'rxjs/operators';
import { Observable, of, from, Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ProductModel } from '../Models/ProductModel';
import { Reflection } from '../Infrastructure/Reflection';
import { AvailableDietsService } from '../available-diets.service';
import { SelectedDayIndicator } from '../Models/SelectedDayIndicator';
import { DaySelectorService } from '../day-selector.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, AfterViewInit {

  public longLastingProducts$: Observable<ProductModel[]>;
  public shortExpirationDateProducts$: Observable<ProductModel[]>;

  public days = DayOfWeek;
  public dietDays$: Observable<DietHarmonogramModel[]>;

  public selectedDays: SelectedDayIndicator[];

  @ViewChild('dietDaysForm') form: NgForm;

  constructor(
    private dietHarmonogramService: DietHarmonogramService,
    private availableDiets: AvailableDietsService,
    private reflectionHelper: Reflection,
    private daySelectorService: DaySelectorService) { 
      this.selectedDays = daySelectorService.GetSelectedDays();
    }

  ngOnInit(): void {

    this.dietDays$ = this.availableDiets.getDietname()
    .pipe(
      flatMap(dietName => this.dietHarmonogramService.getDietHarmonogramData(dietName)),
      shareReplay()
    );
  }

  ngAfterViewInit(): void {

    const selectedDays$ = this.form.valueChanges.pipe(
      delay(1), // delay(1) is neccessary because The valueChanges event fires
                // immediately after the new value is updated but before the change is bubbled up to its parent
                // without delay(1), dietDays is holding previous value
      flatMap(x => this.dietDays$),
      map(x => x.filter(y => y.isSelected))
    );

    const combinedProducts$ = selectedDays$.pipe(
      map(x => this.MergeAllProductIntoOneList(x))
    );

    this.longLastingProducts$ = combinedProducts$.pipe(
      map(x => {
        return x.filter(y => y.ProductDictionary.IsLongLastingProduct === true);
      }),
      map(x => {
        return x.sort(this.SortLogicCompareFunction);
      })
    );

    this.shortExpirationDateProducts$ = combinedProducts$.pipe(
      map(x => {
        return x.filter(y => y.ProductDictionary.IsLongLastingProduct === false);
      }),
      map(x => {
        return x.sort(this.SortLogicCompareFunction);
      })
    );

  }

  private SortLogicCompareFunction(a: ProductModel, b: ProductModel): number {
    return a.ProductDictionary.ProductName.localeCompare(b.ProductDictionary.ProductName);
  }

  private MergeAllProductIntoOneList(input: DietHarmonogramModel[]): ProductModel[] {
    const result: ProductModel[] = [];

    for (const dietDay of input) {
      for (const product of dietDay.Products) {

        const existingElement = result.find(x => x.ProductDictionaryId === product.ProductDictionaryId);

        if (existingElement) {
          result[result.indexOf(existingElement)].Weight = Number(result[result.indexOf(existingElement)].Weight) + Number(product.Weight);
        } else {

          result.push(this.reflectionHelper.deepClone(product));
        }
      }
    }

    return result;
  }

}
