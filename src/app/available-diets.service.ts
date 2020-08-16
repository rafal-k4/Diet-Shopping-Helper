import { Injectable, Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SelectedDietCookieName } from './Infrastructure/Consts';
import { Observable, of } from 'rxjs';
import { DietsSheetNames } from './Models/DietsSheetNames';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { map, tap } from 'rxjs/operators';
import { Mapper } from './Infrastructure/Mapper';
import { AVAILABLE_DIETS_MAPPER_TOKEN } from './Infrastructure/InjectionTokens';
import { SpreadsheetApiModel } from './Models/SpreadsheetApiModel';

@Injectable({
  providedIn: 'root'
})
export class AvailableDietsService {

  constructor(
    private cookieService: CookieService,
    private client: HttpClient,
    private config: ConfigService,
    @Inject(AVAILABLE_DIETS_MAPPER_TOKEN) private mapper: Mapper<DietsSheetNames>) { }

  getSelectedDietName(): Observable<string> {

    if(this.cookieService.check(SelectedDietCookieName)){
      return of(this.cookieService.get(SelectedDietCookieName));
    }
    
    return this.getAvailableDietList()
      .pipe(
        map(x => {
          let latestDiet = this.getLastElementInArr(x);
          this.setDefaultCookieValue(latestDiet);
          return latestDiet.Id
        })
      );
  }

  getAvailableDietList(): Observable<DietsSheetNames[]> {
    
    return this.client.get(
      `${this.config.baseSpreadsheetUrl}`
      + `${this.config.appConfig.SpreadSheets.AvailableDiets.Id}/values/`
      + `${this.config.appConfig.SpreadSheets.AvailableDiets.SheetsNames[0]}`
      + `?key=${this.config.appConfig.sheetId}`
      + `${this.config.appConfig.dictionaryId}`
    ).pipe(
      map(x => {
        const rows = (x as SpreadsheetApiModel).values
        const headers = rows.shift();

        return this.mapper.toModel(headers, rows);
      })
    )
  }

  setCookie(value: any) {
    if(value) { //is not empty
      this.cookieService.set(SelectedDietCookieName, value);
    }
  }
  
  private setDefaultCookieValue(x: DietsSheetNames) {
    this.cookieService.set(SelectedDietCookieName, x.Id);
  }

  private getLastElementInArr(x: DietsSheetNames[]): DietsSheetNames {
    return x[x.length - 1];
  }

}
