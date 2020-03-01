import { ProductModel } from './ProductModel';
import { DayOfWeek } from '../Infrastructure/DayOfWeek';

export class DietHarmonogramModel {
  Day: DayOfWeek;
  Products: ProductModel[];
  isSelected?: boolean;
}
