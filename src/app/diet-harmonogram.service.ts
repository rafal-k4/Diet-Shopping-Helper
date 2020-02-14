import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class DietHarmonogramService {

  constructor(private client: HttpClient, private config: ConfigService) { }

  GetDietHarmonogramData() {
    const result = this.client.get(`https://sheets.googleapis.com/v4/spreadsheets/${this.config.SpreadSheets.DietHarmonogram.Id}/values/`
    + `${this.config.SpreadSheets.DietHarmonogram.SheetsNames[0]}?key=${this.config.ApiKey}`);

    result.subscribe(x => console.log(x));
  }
}
