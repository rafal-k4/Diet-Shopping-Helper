import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DietHarmonogramService } from '../diet-harmonogram.service';
import { DietHarmonogramModel } from '../Models/DietHarmonogramModel';
import { DayOfWeek } from '../Infrastructure/DayOfWeek';
import { NgForm } from '@angular/forms';
import { map, delay, switchMap, flatMap, filter } from 'rxjs/operators';
import { Observable, of, from } from 'rxjs';
import { ProductModel } from '../Models/ProductModel';
import { Reflection } from '../Infrastructure/Reflection';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, AfterViewInit {

  public longLastingProducts$: Observable<ProductModel[]>;
  public shortExpirationDateProducts$: Observable<ProductModel[]>;

  public days = DayOfWeek;
  public dietDays: DietHarmonogramModel[];
  @ViewChild('dietDaysForm') form: NgForm;


  constructor(
    private dietHarmonogramService: DietHarmonogramService,
    private reflectionHelper: Reflection) { }

  ngOnInit(): void {
    this.dietHarmonogramService.getDietHarmonogramData({ fillRelatedObjects: true }).subscribe(x => {
      this.dietDays = x;
    });

  }

  ngAfterViewInit(): void {

    const selectedDays$ = this.form.valueChanges.pipe(
      delay(1), // delay(1) is neccessary because The valueChanges event fires
                // immediately after the new value is updated but before the change is bubbled up to its parent
                // without delay(1), dietDays is holding previous value
      map(x => this.dietDays),
      map(x => x.filter(y => y.isSelected))
    );

    const combinedProducts$ = selectedDays$.pipe(
      flatMap(x => of(this.MergeAllProductIntoOneList(x)))
    );

    this.longLastingProducts$ = combinedProducts$.pipe(
      map(x => {
        return x.filter(y => y.ProductDictionary.IsLongLastingProduct === true);
      })
    );

    this.shortExpirationDateProducts$ = combinedProducts$.pipe(
      map(x => {
        return x.filter(y => y.ProductDictionary.IsLongLastingProduct === false);
      })
    );

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
