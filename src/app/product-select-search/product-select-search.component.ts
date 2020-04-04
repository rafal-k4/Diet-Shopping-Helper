import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, of, Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
import { startWith, switchMap, tap, map } from 'rxjs/operators';
import { ProductDictionaryModel } from '../Models/ProductDictionaryModel';
import { DictionaryProductService } from '../dictionary-product.service';
import { ProductdataPipe } from '../infrastructure/productdata.pipe';

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
  productsInSelectList: Observable<ProductDictionaryModel[]>;
  filteredProducts: Observable<ProductDictionaryModel[]>;


  @ViewChild('productInput') productInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  @Output() productSelectedEvent = new EventEmitter<number[]>();

  constructor(private dictionaryProductService: DictionaryProductService) {
    this.productsInSelectList = dictionaryProductService.getProductDictionaryData().pipe(
      map( x => x.filter(this.getProductsExceptAlreadySelected()))
    );
  }

  ngOnInit(): void {
    this.filteredProducts = this.formCtrl.valueChanges.pipe(
      startWith(''),
      switchMap((inputValue: string) =>
        this.isNullOrWhiteSpace(inputValue) === false
          ? this._filter(inputValue)
          : this.productsInSelectList
      )
    );
  }




  openPanel(autocompleteTrigger: MatAutocompleteTrigger) {
    autocompleteTrigger.openPanel();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add product to mat-chip
    if (this.isNullOrWhiteSpace(value) === false) {

      const product = this.getProductByName(value);

      if (product) {
        this.productsIds.push(product.Id);
        //this.updateProductsInSelectList(product);
        this.productSelectedEvent.emit(this.productsIds);

      }

      this.productsNames.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.formCtrl.setValue(null);
  }

  remove(product: string): void {
    const index = this.productsNames.indexOf(product);

    if (index >= 0) {
      this.productsNames.splice(index, 1);
    }

    const existingProduct = this.getProductByName(product);

    if (existingProduct) {
      const indexInIdsTable = this.productsIds.indexOf(existingProduct.Id);

      if (indexInIdsTable >= 0) {
        this.productsIds.splice(indexInIdsTable, 1);
        this.productSelectedEvent.emit(this.productsIds);
      }
    }

  }

  selected(event: MatAutocompleteSelectedEvent): void {

    this.productsNames.push(event.option.viewValue);

    this.productsIds.push(event.option.value);
    this.productSelectedEvent.emit(this.productsIds);

    this.productInput.nativeElement.value = '';
    this.formCtrl.setValue(null);
  }

  private getProductByName(value: string): ProductDictionaryModel {
    const lowerCaseValue = value.trim().toLowerCase();
    return this.allProducts.find(x => x.ProductName.trim().toLowerCase() === lowerCaseValue);
  }


  private _filter(value: string): Observable<ProductDictionaryModel[]> {
    const filterValue = value.toLowerCase();
    return this.productsInSelectList.pipe(
      map(x => x.filter(product => product.ProductName.toLowerCase().includes(filterValue)))
    )

              //.filter(this.getProductsExceptAlreadySelected());
  }

  private getProductsExceptAlreadySelected(): (product: ProductDictionaryModel) => boolean {
    return (product: ProductDictionaryModel) => !this.productsNames.find(prodName => prodName === product.ProductName);
  }

  private getProducts(): Observable<ProductDictionaryModel[]> {
    return this.dictionaryProductService.getProductDictionaryData();
  }

  private doesProductsExists(products: ProductDictionaryModel[]): boolean {
    return !products ? false : true;
  }

  private isNullOrWhiteSpace(inputValue: string): boolean {
    return !inputValue ? true : !inputValue.trim() ? true : false;
  }

}
