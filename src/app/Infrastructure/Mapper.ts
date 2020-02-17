import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Mapper<TResult> {

  constructor() {

  }

  ToModel(inputType: new () => TResult, input: Array<Array<string>>): Array<TResult> {

    let asd = new inputType();

    console.log("----------------PROPERTIES---------------");
    console.log(Object.getOwnPropertyNames(asd));
    console.log(Reflect.getPrototypeOf(asd));
    console.log("----------------PROPERTIES---------------");

    // input.forEach(tableRow => {
    //   tableRow.forEach(tableRecord => {
    //     //console.log(tableRecord);
    //   });
    // });

    return null;
  }
}

