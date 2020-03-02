import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Reflection {

  getPropertyCount<T>(type: new () => T): number {
    return Object.getOwnPropertyNames(new type()).length;
  }

  getProperties<T>(type: new () => T): string[] {
    return Object.getOwnPropertyNames(new type());
  }

  getValuesOfEnum(enumType: any): string[] {
    return Object.keys(enumType).filter((type) => isNaN(type as any));
  }

  getEnumSize(enumType: any): number {
    return this.getValuesOfEnum(enumType).length;
  }

  deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

  getStringifiedObject<T>(obj: T): string {
    return JSON.stringify(obj);
  }
}
