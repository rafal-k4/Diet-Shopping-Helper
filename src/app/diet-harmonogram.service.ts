import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { map, shareReplay, timestamp } from 'rxjs/operators';
import { Observable } from 'rxjs';
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

  private cache$: Observable<DietHarmonogramModel[]>;

  constructor(
    private client: HttpClient,
    private config: ConfigService,
    @Inject(DIET_HARMONOGRAM_MAPPER_TOKEN) private mapper: Mapper<ProductModel>,
    private reflection: Reflection,
    private dicionaryProductService: DictionaryProductService) {

     }

  getDietHarmonogramData(fillRelatedObjects: boolean): Observable<DietHarmonogramModel[]> {

    if (!this.cache$) {
      this.cache$ = this.client.get(
        `${this.config.baseSpreadsheetUrl}`
      + `${this.config.appConfig.SpreadSheets.DietHarmonogram.Id}/values/`
      + `${this.config.appConfig.SpreadSheets.DietHarmonogram.SheetsNames[0]}`
      + `?key=${this.config.appConfig.sheetId}`
      + `${this.config.appConfig.dictionaryId}`)
      .pipe(
        map(x => {
          const rows = (x as SpreadsheetApiModel).values;

          return this.getChoppedModelByWeekDays(rows, fillRelatedObjects);
        }),
        shareReplay(1)
      );
    }

    return this.cache$;
  }

  private getChoppedModelByWeekDays(rows: string[][], fillRelatedObjects: boolean): DietHarmonogramModel[] {

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

    if(fillRelatedObjects) {
      this.mapProductDictionary(result);
    }
    console.log(result)
    return result;
  }
  private mapProductDictionary(result: DietHarmonogramModel[]) {

    this.dicionaryProductService.getProductDictionaryData().subscribe({
      next: (x) => {

        for (const item of result) {
          item.Products[0].ProductDictionary = x[0];
        }
      }
    });

  }

  private getDietModel(choppedTable: string[][], dayOfWeek: string): DietHarmonogramModel {
    return {
      Day: DayOfWeek[dayOfWeek],
      Products: this.mapper.toModel(choppedTable[1], choppedTable.slice(2, choppedTable.length))
    };
  }
}
