
export class ProductDictionaryModel {
  Id: number;
  ProductName: string;
  WeightPerItem: number;
  Unit: string;
  IsQuantityCountable: boolean;

  constructor(id: number = 0, productName: string = '', weightPerItem: number = 0, unit: string = '', isQuantityCountable: boolean = false){
    this.Id = id;
    this.ProductName = productName;
    this.WeightPerItem = weightPerItem;
    this.Unit = unit;
    this.IsQuantityCountable = isQuantityCountable;
  }
}
