import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable, of} from 'rxjs';
import {map, startWith, switchMap, tap} from 'rxjs/operators';
import { ProductDictionaryModel } from '../Models/ProductDictionaryModel';
import { DictionaryProductService } from '../dictionary-product.service';


export interface Fruit {
  name: string;
}


@Component({
  selector: 'app-product-select-search',
  templateUrl: './product-select-search.component.html',
  styleUrls: ['./product-select-search.component.css']
})
export class ProductSelectSearchComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  formCtrl = new FormControl();

  productsNames: string[] = [];

  allProducts: ProductDictionaryModel[];
  filteredProducts: Observable<ProductDictionaryModel[]>;


  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  ngOnInit(): void {
    this.filteredProducts = this.formCtrl.valueChanges.pipe(
      startWith(''),
      switchMap((inputValue) =>
        inputValue ?
          of(this._filter(inputValue))
          : !this.allProducts ?
            this.dictionaryProductService.getProductDictionaryData()
            : of(this.allProducts)
      )
    );
  }


  constructor(private dictionaryProductService: DictionaryProductService) {

    dictionaryProductService.getProductDictionaryData().subscribe(x => {
      this.allProducts = x;
    });
  }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.productsNames.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.formCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.productsNames.indexOf(fruit);

    if (index >= 0) {
      this.productsNames.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.productsNames.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.formCtrl.setValue(null);
  }

  private _filter(value: string): ProductDictionaryModel[] {
    const filterValue = value.toLowerCase();
    return this.allProducts.filter(product => product.ProductName.toLowerCase().indexOf(filterValue) === 0);
  }

}
