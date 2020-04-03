import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, of } from 'rxjs';
import { startWith, switchMap, tap } from 'rxjs/operators';
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
  productsIds: number[] = [];

  allProducts: ProductDictionaryModel[];
  filteredProducts: Observable<ProductDictionaryModel[]>;


  @ViewChild('productInput') productInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  @Output() productSelected = new EventEmitter<string[]>();

  constructor(private dictionaryProductService: DictionaryProductService) {

  }

  ngOnInit(): void {
    this.filteredProducts = this.formCtrl.valueChanges.pipe(
      startWith(''),
      switchMap((inputValue: string) =>
        this.isNullOrWhiteSpace(inputValue) === false
          ? of(this._filter(inputValue))
          : this.doesProductsExists(this.allProducts)
            ? of(this.allProducts)
            : this.getProducts()
      )
    );
  }

  openPanel(autocompleteTrigger: MatAutocompleteTrigger) {
    autocompleteTrigger.openPanel();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if (this.isNullOrWhiteSpace(value) === false) {

      if(this.isProductFromList(value)){
        //this.
      }

      this.productsNames.push(value.trim());

    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.formCtrl.setValue(null);
  }


  isProductFromList(value: string): boolean {
    const lowerCaseValue = value.trim().toLowerCase();
    return this.allProducts.filter(x => x.ProductName.trim().toLowerCase() === lowerCaseValue).length > 0;
  }

  remove(product: string): void {
    const index = this.productsNames.indexOf(product);

    if (index >= 0) {
      this.productsNames.splice(index, 1);
      this.productSelected.emit(this.productsNames);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {

    this.productsNames.push(event.option.viewValue);
    this.productSelected.emit(this.productsNames);

    this.productInput.nativeElement.value = '';
    this.formCtrl.setValue(null);
  }

  private _filter(value: string): ProductDictionaryModel[] {
    const filterValue = value.toLowerCase();
    return this.allProducts.filter(product => product.ProductName.toLowerCase().includes(filterValue));
  }

  private getProducts(): Observable<ProductDictionaryModel[]> {
    return this.dictionaryProductService.getProductDictionaryData().pipe(
      tap( x => {
        this.allProducts = x;
      })
    );
  }

  private doesProductsExists(products: ProductDictionaryModel[]): boolean {
    return !products ? false : true;
  }


  private isNullOrWhiteSpace(inputValue: string): boolean {
    return !inputValue ? true : !inputValue.trim() ? true : false;
  }

}
