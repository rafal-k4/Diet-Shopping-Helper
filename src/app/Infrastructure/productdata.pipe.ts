import { Pipe, PipeTransform } from '@angular/core';
import { ProductModel } from '../Models/ProductModel';

@Pipe({
  name: 'productdata'
})
export class ProductdataPipe implements PipeTransform {

  transform(value: ProductModel, ...args: unknown[]): string {
    console.log(value.ProductDictionary);
    let result = `${value.Item} - `;

    if (value.ProductDictionary && value.ProductDictionary.IsQuantityCountable) {
      result += `${value.Weight}g (${value.Weight / value.ProductDictionary.WeightPerItem} x ${value.ProductDictionary.Unit})`;
    } else {
      result += `${value.Weight}g`;
    }

    return result;
  }

}
