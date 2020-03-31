import { Component, OnInit } from '@angular/core';
import { DietHarmonogramService } from '../diet-harmonogram.service';
import { DietHarmonogramModel } from '../Models/DietHarmonogramModel';
import { DayOfWeek } from '../Infrastructure/DayOfWeek';
import { DictionaryProductService } from '../dictionary-product.service';
import { ProductDictionaryModel } from '../Models/ProductDictionaryModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  days = DayOfWeek;

  dietHarmonogram: DietHarmonogramModel[];

  productDictionary: ProductDictionaryModel[];

  filteredProducts: string[];

  constructor(
    private dietHarmonogramService: DietHarmonogramService,
    private dietDictionaryService: DictionaryProductService) { }

  ngOnInit(): void {
    this.dietHarmonogramService.getDietHarmonogramData({ fillRelatedObjects: true }).subscribe(
      x => {
        this.dietHarmonogram = x;
      }
    );

    this.dietDictionaryService.getProductDictionaryData().subscribe(
      x => {
        this.productDictionary = x;
      }
    );
  }
}
