import { Injectable, Inject } from '@angular/core';
import { SelectedDietCookieName } from './Infrastructure/Consts';
import { Observable, of, interval } from 'rxjs';
import { DietsSheetNames } from './Models/DietsSheetNames';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { map, shareReplay } from 'rxjs/operators';
import { Mapper } from './Infrastructure/Mapper';
import { AVAILABLE_DIETS_MAPPER_TOKEN } from './Infrastructure/InjectionTokens';
import { SpreadsheetApiModel } from './Models/SpreadsheetApiModel';
import { LocalStorageService } from './local-storage.service';
import { CookieService } from 'ngx-cookie-service';
import { DietHarmonogramService } from './diet-harmonogram.service';

@Injectable({
  providedIn: 'root'
})
export class AvailableDietsService {

  private cache$: Observable<DietsSheetNames[]>;

  constructor(
    private cookieService: CookieService,
    private localStorageService: LocalStorageService,
    private client: HttpClient,
    private config: ConfigService,
    @Inject(AVAILABLE_DIETS_MAPPER_TOKEN) private mapper: Mapper<DietsSheetNames>,
    private dietHarmonogramService: DietHarmonogramService) { }

  getSelectedDietName(): Observable<string> {

    const selectedDiet = this.cookieService.get(SelectedDietCookieName);

    if (selectedDiet) {
      return of(selectedDiet);
    }

    return this.getAvailableDietList()
      .pipe(
        map(x => {
          const latestDiet = this.getLastElementInArr(x);
          this.setDefaultCookieValue(latestDiet);

          return latestDiet.id;
        })
      );
  }

  getAvailableDietList(): Observable<DietsSheetNames[]> {

    if (!this.cache$) {
      this.cache$ = this.client.get<SpreadsheetApiModel>(
        `${this.config.baseSpreadsheetUrl}`
        + `${this.config.appConfig.SpreadSheets.AvailableDiets.Id}/values/`
        + `${this.config.appConfig.SpreadSheets.AvailableDiets.SheetsNames[0]}`
        + `?key=${this.config.appConfig.sheetId}`
        + `${this.config.appConfig.dictionaryId}`
      ).pipe(
        map(x => {
          const rows = x.values;
          const headers = rows.shift();

          const result = this.mapper.toModel(headers, rows);

          return result;
        }),
        shareReplay() // this prevents repeating of http request
      );
    }

    return this.cache$;
  }

  setCookie(value: any) {
    if (value) { // is not empty
      this.cookieService.set(SelectedDietCookieName, value);
      this.dietHarmonogramService.refillCache({ fillRelatedObjects: true }, value);
    }
  }

  private setDefaultCookieValue(x: DietsSheetNames) {
    this.setCookie(x.id);
  }

  private getLastElementInArr(x: DietsSheetNames[]): DietsSheetNames {
    return x[x.length - 1];
  }

}
