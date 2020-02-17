import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Mapper } from './Infrastructure/Mapper';
import { ProductModel } from './Models/ProductModel';

@Injectable({
  providedIn: 'root'
})
export class DictionaryProductService {

  constructor(private client: HttpClient, private config: ConfigService, private mapper: Mapper<ProductModel>) { }

  GetProductDictionaryData() {
    const result = this.client.get(`https://sheets.googleapis.com/v4/spreadsheets/${this.config.SpreadSheets.Dictionary.Id}/values/`
    + `${this.config.SpreadSheets.Dictionary.SheetsNames[0]}?key=${this.config.ApiKey}`);

    this.mapper.ToModel(ProductModel, null);

    result.subscribe(x => console.log(x));
  }
}
