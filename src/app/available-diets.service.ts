import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SelectedDietCookieName } from './Infrastructure/Consts';
import { Observable } from 'rxjs';
import { DietsSheetNames } from './Models/DietsSheetNames';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AvailableDietsService {

  constructor(
    private cookieService: CookieService,
    private client: HttpClient,
    private config: ConfigService) { }

  getSelectedDiet(): string {

    if(this.cookieService.check(SelectedDietCookieName)){
      return this.cookieService.get(SelectedDietCookieName);
    }
    
    let asd$ = this.getAvailableDietList();
    //console.log(asd$);
    asd$.subscribe(x => console.log('FROM SUBSCRITION', x));
  }

  private getAvailableDietList(): Observable<DietsSheetNames[]> {
    
    return this.client.get(
      `${this.config.baseSpreadsheetUrl}`
      + `${this.config.appConfig.SpreadSheets.AvailableDiets.Id}/values/`
      + `${this.config.appConfig.SpreadSheets.AvailableDiets.SheetsNames[0]}`
      + `?key=${this.config.appConfig.sheetId}`
      + `${this.config.appConfig.dictionaryId}`
    ).pipe(
      map(x => {
        console.log(x);
        return [new DietsSheetNames()];
      })
    )
  }
}
