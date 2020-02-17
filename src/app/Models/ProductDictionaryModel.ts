import { timingSafeEqual } from 'crypto';

export class ProductDictionaryModel {
  Id: number;
  ProductName: string;
  WeightPerItem: number;
  Unit: string;
  IsQuantityCountable: boolean;

  constructor(id: number, productName: string, weightPerItem: number, unit: string, isQuantityCountable: boolean){
    this.Id = id;
    this.ProductName = productName;
    this.WeightPerItem = weightPerItem;
    this.Unit = unit;
    this.IsQuantityCountable = isQuantityCountable;
  }
}
