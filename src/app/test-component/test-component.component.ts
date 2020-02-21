import { Component, OnInit } from '@angular/core';
import { DietHarmonogramService } from '../diet-harmonogram.service';
import { DictionaryProductService } from '../dictionary-product.service';


@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})
export class TestComponentComponent implements OnInit {

  constructor(private dietHarmonogramService: DietHarmonogramService,
              private productDictionary: DictionaryProductService) { }

  ngOnInit(): void {
    this.dietHarmonogramService.getDietHarmonogramData().subscribe(x => console.log(x));
    this.productDictionary.getProductDictionaryData().subscribe(x => console.log(x));
  }

}
