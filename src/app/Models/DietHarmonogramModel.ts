import { ProductModel } from './ProductModel';

export interface DietHarmonogramModel {
  Day: string;
  Products: [ProductModel];
}
