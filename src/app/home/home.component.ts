import { Component, OnInit } from '@angular/core';
import { DietHarmonogramService } from '../diet-harmonogram.service';
import { DietHarmonogramModel } from '../Models/DietHarmonogramModel';
import { DayOfWeek } from '../Infrastructure/DayOfWeek';
import { DictionaryProductService } from '../dictionary-product.service';
import { ProductDictionaryModel } from '../Models/ProductDictionaryModel';
import { Observable, Subject, of, BehaviorSubject } from 'rxjs';
import { ProductModel } from '../Models/ProductModel';
import { Reflection } from '../Infrastructure/Reflection';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  days = DayOfWeek;

  allProductsDietHarmonogram$: Observable<DietHarmonogramModel[]>;

  filteredListOfProducts$ = new BehaviorSubject<DietHarmonogramModel[]>([]);

  areProductSelected: boolean;

  constructor(
    dietHarmonogramService: DietHarmonogramService,
    private reflection: Reflection) {
      this.allProductsDietHarmonogram$ = dietHarmonogramService.getDietHarmonogramData({ fillRelatedObjects: true});
    }

  receiveSelectedProducts(productsIds: number[]) {
    this.areProductSelected = productsIds.length > 0;

    const filteredProducts = this.getFilteredDietDays(productsIds);
    this.filteredListOfProducts$.next(filteredProducts);
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
