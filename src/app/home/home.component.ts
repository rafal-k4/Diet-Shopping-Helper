import { Component, OnInit } from '@angular/core';
import { DietHarmonogramService } from '../diet-harmonogram.service';
import { DietHarmonogramModel } from '../Models/DietHarmonogramModel';
import { DayOfWeek } from '../Infrastructure/DayOfWeek';
import { DictionaryProductService } from '../dictionary-product.service';
import { ProductDictionaryModel } from '../Models/ProductDictionaryModel';
import { Observable, Subject } from 'rxjs';
import { ProductModel } from '../Models/ProductModel';
import { Reflection } from '../Infrastructure/Reflection';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  days = DayOfWeek;

  allProductsDietHarmonogram: DietHarmonogramModel[];
  productDictionary: ProductDictionaryModel[];

  filteredListOfProducts = new Subject<DietHarmonogramModel[]>();

  areProductSelected: boolean;

  constructor(
    private dietHarmonogramService: DietHarmonogramService,
    private dietDictionaryService: DictionaryProductService,
    private reflection: Reflection) { }

  ngOnInit(): void {
    this.dietHarmonogramService.getDietHarmonogramData({ fillRelatedObjects: true }).subscribe(
      x => {
        this.allProductsDietHarmonogram = x;
      }
    );

    this.dietDictionaryService.getProductDictionaryData().subscribe(
      x => {
        this.productDictionary = x;
      }
    );
  }

  receiveSelectedProducts(productsIds: number[]) {
    this.areProductSelected = productsIds.length > 0;

    const filteredProducts = this.getFilteredDietDays(productsIds);
    this.filteredListOfProducts.next(filteredProducts);

    console.log(filteredProducts);
    console.log(productsIds);
  }

  private getFilteredDietDays(productsIds: number[]): DietHarmonogramModel[] {
    const resultDietDays: DietHarmonogramModel[] = [];

    for (const dietDay of this.allProductsDietHarmonogram) {
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
  }
}
