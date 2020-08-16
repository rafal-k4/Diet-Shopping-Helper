import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  set(key: string, value): void {
    console.log(`from SET: ${sessionStorage.testForSelectedDiet}`);
    console.log(`from SET2: ${sessionStorage.selectedDiet}`);
    sessionStorage.selectedDiet = value;
    //sessionStorage.setItem(key, value);
  }

  get(key: string): string {
    console.log(`from GET: ${sessionStorage.testForSelectedDiet}`);
    console.log(`from GET2: ${sessionStorage.selectedDiet}`);
    return sessionStorage.selectedDiet;
    //return sessionStorage.getItem(key);
  }
}
