import { Injectable, InjectionToken, Inject } from '@angular/core';
import { ColumnNameProvider } from './Decorators';
import { TokenizeResult } from '@angular/compiler/src/ml_parser/lexer';
import { Reflection } from './Reflection';

const EMPTY_TOKEN = new InjectionToken('empty_token');

@Injectable({
  providedIn: 'root'
})
export class Mapper<TResult> {

  constructor(
    @Inject(EMPTY_TOKEN) private inputType: new () => TResult,
    reflection: Reflection) {
  }

  toModel(headers: string[], inputValues: string[][]): Array<TResult> {

    const resultTable: Array<TResult> = [];

    for (const row of inputValues) {
      const genericObj = this.getConvertedRow(row, headers);
      resultTable.push(genericObj);
    }

    return resultTable;
  }


  private getConvertedRow(row: string[], headers: string[]): TResult {

    const propertyNames = Object.getOwnPropertyNames(new this.inputType());
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
    return (value === 'TRUE') ? true : (value === 'false') ? false : value;
  }
}

