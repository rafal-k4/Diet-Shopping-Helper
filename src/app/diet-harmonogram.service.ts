import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DietHarmonogramService {

  constructor(private client: HttpClient, private config: ) { }

  GetDietHarmonogramData() {
    console.log('test');
    this.client.get()
  }
}
