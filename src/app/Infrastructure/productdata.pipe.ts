import { Pipe, PipeTransform } from '@angular/core';
import { ProductModel } from '../Models/ProductModel';

@Pipe({
  name: 'productdata'
})
export class ProductdataPipe implements PipeTransform {

  transform(value: ProductModel, ...args: unknown[]): string {
    console.log(value.ProductDictionary);
    let result = `${value.Item} - `;

    result += `${value.ProductDictionary.WeightPerItem} x ${value.ProductDictionary.Unit}`
     + `${value.ProductDictionary.IsQuantityCountable} ${value.ProductDictionary.IsQuantityCountable} `;



    return result;
  }

}
