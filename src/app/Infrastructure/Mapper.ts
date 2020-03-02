import { Injectable, InjectionToken, Inject } from '@angular/core';
import { ColumnNameProvider } from './Decorators';
import { Reflection } from './Reflection';

const EMPTY_TOKEN = new InjectionToken('empty_token');

@Injectable({
  providedIn: 'root'
})
export class Mapper<TResult> {

  constructor(
    @Inject(EMPTY_TOKEN) private inputType: new () => TResult,
    private reflection: Reflection) {
  }

  toModel(headers: string[], inputValues: string[][]): Array<TResult> {

    const resultTable: Array<TResult> = [];

    for (const row of inputValues) {
      if (this.isRowEmptyOrEmptyValues(row) === false) {
        const genericObj = this.getConvertedRow(row, headers);
        resultTable.push(genericObj);
      }
    }

    return resultTable;
  }

  private isRowEmptyOrEmptyValues(row: string[]): boolean {
    console.log(row, row.length, this.hasArrayAnyValues(row));
    return (!row || row.length === 0 || this.hasArrayAnyValues(row) === false)
      ? true
      : false;
  }

  private hasArrayAnyValues(array: string[]): boolean {

    for (const record of array) {
      if (record !== '') {
        return true;
      }
    }

    return false;
  }


  private getConvertedRow(row: string[], headers: string[]): TResult {

    const propertyNames = this.reflection.getProperties<TResult>(this.inputType);
    const inputTypeObj = new this.inputType();

    for (const [index, value] of row.entries()) {
      for (const propName of propertyNames) {

        const columnName = ColumnNameProvider.getColumnNameDecoratorValue(inputTypeObj, propName);

        if (columnName === headers[index]) {
          inputTypeObj[propName] = this.RemapValueIfIncomingTypeIsBoolean(value);
        }
      }
    }

    return inputTypeObj;
  }


  private RemapValueIfIncomingTypeIsBoolean(value: string): string | boolean {
    return (value === 'TRUE') ? true : (value === 'FALSE') ? false : value;
  }
}

