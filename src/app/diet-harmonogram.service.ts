import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { map, shareReplay, timestamp, tap, switchMap } from 'rxjs/operators';
import { Observable, from, forkJoin, of } from 'rxjs';
import { ProductModel } from './Models/ProductModel';
import { Mapper } from './Infrastructure/Mapper';
import { DIET_HARMONOGRAM_MAPPER_TOKEN } from './Infrastructure/InjectionTokens';
import { SpreadsheetApiModel } from './Models/SpreadsheetApiModel';
import { Reflection } from './Infrastructure/Reflection';
import { DayOfWeek } from './Infrastructure/DayOfWeek';
import { DietHarmonogramModel } from './Models/DietHarmonogramModel';
import { DictionaryProductService } from './dictionary-product.service';
import { ProductDictionaryModel } from './Models/ProductDictionaryModel';

@Injectable({
  providedIn: 'root'
})
export class DietHarmonogramService {

  public refillCache: boolean;

  private cache$: Observable<DietHarmonogramModel[]>;

  constructor(
    private client: HttpClient,
    private config: ConfigService,
    @Inject(DIET_HARMONOGRAM_MAPPER_TOKEN) private mapper: Mapper<ProductModel>,
    private reflection: Reflection,
    private dicionaryProductService: DictionaryProductService) {

     }

  getDietHarmonogramData(dietSheetName: string): Observable<DietHarmonogramModel[]> {

    if (!this.cache$ || this.refillCache) {
      this.cache$ = this.client.get<SpreadsheetApiModel>(
        `${this.config.baseSpreadsheetUrl}`
      + `${this.config.appConfig.SpreadSheets.DietHarmonogram.Id}/values/`
      + `${dietSheetName}`
      + `?key=${this.config.appConfig.sheetId}`
      + `${this.config.appConfig.dictionaryId}`)
      .pipe(
        map(x => this.getChoppedModelByWeekDays(x.values)),
        map(x => this.aggregateRepeatingProducts(x)),
        tap(() => console.log('DietHarmonogram INVOKED')),
        switchMap(dietHarmonograms => {
          return forkJoin([of(dietHarmonograms), this.dicionaryProductService.getProductDictionaryData()])
            .pipe(
              map(combinedObservables => this.mapProductDictionary(combinedObservables[0], combinedObservables[1]))
            );
        }),
        shareReplay() // this prevents repeating of http request
      );

      this.refillCache = false;
    }

    return this.cache$;
  }

  private aggregateRepeatingProducts(dietDays: DietHarmonogramModel[]): DietHarmonogramModel[] {

    for (const dietDay of dietDays) {
      const uniqueDictionaryIds = new Set(dietDay.Products.map((product) => product.ProductDictionaryId));

      const grouppedProducts: ProductModel[] = [];
      for (const id of uniqueDictionaryIds) {
        const filteredByIdProducts = dietDay.Products.filter(x => x.ProductDictionaryId === id);

        grouppedProducts.push(new ProductModel(
          filteredByIdProducts[0].Item,
          filteredByIdProducts.reduce((prevValue, currValue) => prevValue + Number(currValue.Weight), 0),
          filteredByIdProducts[0].ProductDictionaryId
        ));
      }
      dietDay.Products = grouppedProducts;
    }

    return dietDays;
  }

  private getChoppedModelByWeekDays(rows: string[][]): DietHarmonogramModel[] {

    const result: DietHarmonogramModel[] = [];
    const chopSize = this.reflection.getPropertyCount(ProductModel);
    const days = this.reflection.getValuesOfEnum(DayOfWeek);

    let startIndex = 0;
    let endIndex = chopSize;

    for (const day of days) {

      const choppedTable: string[][] = [];

      for (const row of rows) {
        choppedTable.push(row.slice(startIndex, endIndex));
      }

      startIndex = endIndex;
      endIndex += chopSize;

      result.push(this.getDietModel(choppedTable, day));
    }

    return result;
  }
  private mapProductDictionary(
    dietDays: DietHarmonogramModel[],
    productDictionary: ProductDictionaryModel[]): DietHarmonogramModel[] {

    for (const dietDay of dietDays) {
      for (const product of dietDay.Products) {
        product.ProductDictionary = productDictionary.find(z => z.Id === product.ProductDictionaryId);
      }
    }

    return dietDays;
  }

  private getDietModel(choppedTable: string[][], dayOfWeek: string): DietHarmonogramModel {
    return {
      Day: DayOfWeek[dayOfWeek],
      Products: this.mapper.toModel(choppedTable[1], choppedTable.slice(2, choppedTable.length))
    };
  }
}
