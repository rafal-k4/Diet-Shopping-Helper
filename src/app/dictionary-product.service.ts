import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Mapper } from './Infrastructure/Mapper';
import { ProductModel } from './Models/ProductModel';

@Injectable({
  providedIn: 'root'
})
export class DictionaryProductService {

  constructor(private client: HttpClient, private config: ConfigService) { }

  GetProductDictionaryData() {
    const result = this.client.get(`https://sheets.googleapis.com/v4/spreadsheets/${this.config.SpreadSheets.Dictionary.Id}/values/`
    + `${this.config.SpreadSheets.Dictionary.SheetsNames[0]}?key=${this.config.ApiKey}`);

//    var test = new Mapper<ProductModel>().ToModel(null);

    var test = new Mapper<ProductModel>();
    test.Test();
    var asdasda = test.Create2(ProductModel);
    //console.log(asdasda);\

    console.log(Object.getOwnPropertyNames(asdasda));

    // const objectKeys = Object.keys(asdasda) as Array<keyof ProductModel>;
    // for (let key of objectKeys)
    // {
    //    console.log('key:' + key.toString());
    // }




    result.subscribe(x => console.log(x));
  }
}
