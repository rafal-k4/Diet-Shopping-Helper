import { Injectable, Inject } from '@angular/core';
import { SelectedDietCookieName } from './Infrastructure/Consts';
import { Observable, of, interval, Subject } from 'rxjs';
import { DietsSheetNames } from './Models/DietsSheetNames';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { map, shareReplay, subscribeOn } from 'rxjs/operators';
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

  public selectedDietName$: Observable<string>;

  private selectDietNameSubject$: Subject<string>;
  private cache$: Observable<DietsSheetNames[]>;

  constructor(
    private cookieService: CookieService,
    private localStorageService: LocalStorageService,
    private client: HttpClient,
    private config: ConfigService,
    @Inject(AVAILABLE_DIETS_MAPPER_TOKEN) private mapper: Mapper<DietsSheetNames>,
    private dietHarmonogramService: DietHarmonogramService) {
      this.selectDietNameSubject$ = new Subject();
      this.selectedDietName$ = this.selectDietNameSubject$.asObservable();
    }

  getSelectedDietName(): Observable<string> {

    const selectedDiet = this.cookieService.get(SelectedDietCookieName);

    if (selectedDiet) {
      this.selectDietNameSubject$.next(selectedDiet);
      return this.selectedDietName$;
      //return of(selectedDiet);
    }

    this.getAvailableDietList()
      .subscribe(x => {
        const latestDiet = this.getLastElementInArr(x);
        this.setDefaultCookieValue(latestDiet);

        this.selectDietNameSubject$.next(latestDiet.id);
      });

    return this.selectedDietName$;
      // .pipe(
      //   map(x => {
      //     const latestDiet = this.getLastElementInArr(x);
      //     this.setDefaultCookieValue(latestDiet);

      //     return latestDiet.id;
      //   })
      // );
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

          return this.mapper.toModel(headers, rows);
        }),
        shareReplay() // this prevents repeating of http request
      );
    }

    return this.cache$;
  }

  setCookie(value: any) {
    if (value) { // is not empty
      this.dietHarmonogramService.refillCache = true;
      this.selectDietNameSubject$.next(value);
      this.cookieService.set(SelectedDietCookieName, value);
    }
  }

  private setDefaultCookieValue(x: DietsSheetNames) {
    this.setCookie(x.id);
  }

  private getLastElementInArr(x: DietsSheetNames[]): DietsSheetNames {
    return x[x.length - 1];
  }

}
