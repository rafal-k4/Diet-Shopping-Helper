import { Component, OnInit } from '@angular/core';
import { DietHarmonogramService } from '../diet-harmonogram.service';
import { DietHarmonogramModel } from '../Models/DietHarmonogramModel';
import { DayOfWeek } from '../Infrastructure/DayOfWeek';
import { DictionaryProductService } from '../dictionary-product.service';
import { ProductDictionaryModel } from '../Models/ProductDictionaryModel';
import { Observable, Subject, of, BehaviorSubject, forkJoin } from 'rxjs';
import { ProductModel } from '../Models/ProductModel';
import { Reflection } from '../Infrastructure/Reflection';
import { map, flatMap, shareReplay } from 'rxjs/operators';
import { AvailableDietsService } from '../available-diets.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  allProductsDietHarmonogram$: Observable<DietHarmonogramModel[]>;

  filteredListOfProducts$: Observable<DietHarmonogramModel[]>;

  areProductSelected: boolean;

  constructor(
    dietHarmonogramService: DietHarmonogramService,
    availableDiets: AvailableDietsService,
    private reflection: Reflection) {

      this.allProductsDietHarmonogram$ = availableDiets.selectedDietName$
        .pipe(
          flatMap(dietName => dietHarmonogramService.getDietHarmonogramData(dietName)),
          shareReplay()
        );
    }

  receiveSelectedProducts(productsIds: number[]) {
    this.areProductSelected = productsIds.length > 0;

    this.filteredListOfProducts$ = this.getFilteredDietDays(productsIds);
  }

  private getFilteredDietDays(productsIds: number[]): Observable<DietHarmonogramModel[]> {

    return this.allProductsDietHarmonogram$.pipe(
      map(dietDays => {
        const resultDietDays: DietHarmonogramModel[] = [];

        for (const dietDay of dietDays) {
          const filteredDietDay = new DietHarmonogramModel();
          filteredDietDay.Day = dietDay.Day;
          filteredDietDay.Products = [];

          for (const productId of productsIds) {
            if (dietDay.Products.some(x => x.ProductDictionary.Id === productId)) {
              const selectedProduct = dietDay.Products.find(x => x.ProductDictionary.Id === productId);

              filteredDietDay.Products.push(this.reflection.deepClone(selectedProduct));
            }
          }

          resultDietDays.push(filteredDietDay);
        }
        return resultDietDays;
      })
    );
  }
}
