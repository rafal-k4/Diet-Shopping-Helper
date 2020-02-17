import { columnName } from '../Infrastructure/Decorators';

export class ProductModel {
  @columnName('Item')
  Item: string;
  @columnName('Weight')
  Weight: number;
  @columnName('ProductDictionaryId')
  ProductDictionaryId: number;

  constructor(item: string = '', weight: number = 0, productDictionaryId: number = 0) {
    this.Item = item;
    this.Weight = weight;
    this.ProductDictionaryId = productDictionaryId;
  }
}
