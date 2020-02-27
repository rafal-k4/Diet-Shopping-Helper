import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Mapper } from './Infrastructure/Mapper';
import { ProductDictionaryModel } from './Models/ProductDictionaryModel';
import { map, shareReplay } from 'rxjs/operators';
import { SpreadsheetApiModel } from './Models/SpreadsheetApiModel';
import { Observable } from 'rxjs';
import { DICTIONARY_PRODUCT_MAPPER_TOKEN } from './Infrastructure/InjectionTokens';


@Injectable({
  providedIn: 'root'
})
export class DictionaryProductService {

  private cache$: Observable<ProductDictionaryModel[]>;

  constructor(
    private client: HttpClient,
    private config: ConfigService,
    @Inject(DICTIONARY_PRODUCT_MAPPER_TOKEN) private mapper: Mapper<ProductDictionaryModel>) { }

  getProductDictionaryData(): Observable<ProductDictionaryModel[]> {

    if (!this.cache$) {
      this.cache$ = this.client.get(
        `${this.config.baseSpreadsheetUrl}`
      + `${this.config.appConfig.SpreadSheets.Dictionary.Id}/values/`
      + `${this.config.appConfig.SpreadSheets.Dictionary.SheetsNames[0]}`
      + `?key=${this.config.appConfig.sheetId}`
      + `${this.config.appConfig.dictionaryId}`)
        .pipe(
          map(x => {
            const rows = (x as SpreadsheetApiModel).values;
            const headers = rows.shift();

            return this.mapper.toModel(headers, rows);
          }),
          shareReplay(1)
      );
    }

    return this.cache$;
  }
}
