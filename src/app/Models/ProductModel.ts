import { columnName } from '../Infrastructure/Decorators';

export class ProductModel {
  Item: string;
  Weight: number;
  @columnName('test column name')
  ProductDictionaryId: number;

  constructor(item: string = '', weight: number = 0, productDictionaryId: number = 0) {
    this.Item = item;
    this.Weight = weight;
    this.ProductDictionaryId = productDictionaryId;
  }
}
