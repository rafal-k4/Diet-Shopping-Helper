import { columnName } from '../Infrastructure/Decorators';

export class ProductDictionaryModel {
  @columnName('ID')
  Id: number;
  ProductName: string;
  WeightPerItem: number;
  IsQuantityCountable: boolean;
  Unit: string;
  IsLongLastingProduct: boolean;

  constructor(id: number = 0,
              productName: string = '',
              weightPerItem: number = 0,
              unit: string = '',
              isQuantityCountable: boolean = false,
              isLongLastingProduct: boolean = false) {
    this.Id = id;
    this.ProductName = productName;
    this.WeightPerItem = weightPerItem;
    this.Unit = unit;
    this.IsQuantityCountable = isQuantityCountable;
    this.IsLongLastingProduct = isLongLastingProduct;
  }
}
