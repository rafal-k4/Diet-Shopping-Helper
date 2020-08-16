import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  set(key: string, value): void {
    sessionStorage.selectedDiet = value;
    //sessionStorage.setItem(key, value);
  }

  get(key: string): string {
    return sessionStorage.selectedDiet;
    //return sessionStorage.getItem(key);
  }
}
