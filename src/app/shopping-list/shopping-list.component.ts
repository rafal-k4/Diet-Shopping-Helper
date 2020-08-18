import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DietHarmonogramService } from '../diet-harmonogram.service';
import { DietHarmonogramModel } from '../Models/DietHarmonogramModel';
import { DayOfWeek } from '../Infrastructure/DayOfWeek';
import { NgForm } from '@angular/forms';
import { map, delay, flatMap, tap, shareReplay } from 'rxjs/operators';
import { Observable, of, from, Subject } from 'rxjs';
import { ProductModel } from '../Models/ProductModel';
import { Reflection } from '../Infrastructure/Reflection';
import { AvailableDietsService } from '../available-diets.service';

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

  URL: string;
  dietsNameHotObservable: Observable<string>;
  subj: Subject<string>;

  @ViewChild('dietDaysForm') form: NgForm;


  constructor(
    private dietHarmonogramService: DietHarmonogramService,
    private availableDiets: AvailableDietsService,
    private reflectionHelper: Reflection) {
      this.subj = new Subject<string>();
      this.dietsNameHotObservable = this.subj.asObservable();

    }

  ngOnInit(): void {

    this.URL = this.secondUrl;

    this.dietDays$ = this.dietsNameHotObservable
    .pipe(
      flatMap(dietName =>
        this.dietHarmonogramService.getDietHarmonogramData(
          { fillRelatedObjects: true},
          dietName
        )
      ),
      shareReplay()
    );

  }

  changeFirstUrl(): void {
    this.subj.next(this.firstUrl);
    this.URL = this.firstUrl;
  }

  changeSecondUrl(): void {
    this.subj.next(this.secondUrl);
    this.URL = this.secondUrl;
  }

  firstUrl = 'Variant2(03.2020)';
  secondUrl = 'Variant_1';

  ngAfterViewInit(): void {

    const selectedDays$ = this.form.valueChanges.pipe(
      tap(x => console.log(x)),
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
