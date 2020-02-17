import { columnName } from '../Infrastructure/Decorators';

export class ProductDictionaryModel {
  @columnName('ID')
  Id: number;
  @columnName('ProductName')
  ProductName: string;
  @columnName('WeightPerItem')
  WeightPerItem: number;
  @columnName('Unit')
  Unit: string;
  @columnName('IsQuantityCountable')
  IsQuantityCountable: boolean;

  constructor(id: number = 0,
              productName: string = '',
              weightPerItem: number = 0,
              unit: string = '',
              isQuantityCountable: boolean = false) {
    this.Id = id;
    this.ProductName = productName;
    this.WeightPerItem = weightPerItem;
    this.Unit = unit;
    this.IsQuantityCountable = isQuantityCountable;
  }
}
