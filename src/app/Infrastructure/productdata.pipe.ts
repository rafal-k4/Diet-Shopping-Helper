import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productdata'
})
export class ProductdataPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    console.log(value, args);
    return '';
  }

}
