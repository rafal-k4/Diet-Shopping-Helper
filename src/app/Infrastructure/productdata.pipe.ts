import { Pipe, PipeTransform } from '@angular/core';
import { ProductModel } from '../Models/ProductModel';

@Pipe({
  name: 'productdata'
})
export class ProductdataPipe implements PipeTransform {

  transform(value: ProductModel, ...args: unknown[]): string {

    let result = `${value.Item} - ${value.Weight} `;

    return (value.ProductDictionary && value.ProductDictionary.IsQuantityCountable)
      ? result += ` (${(value.Weight / value.ProductDictionary.WeightPerItem).toFixed(1)} x ${value.ProductDictionary.Unit})`
      : result;
  }

}
