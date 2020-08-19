import { Injectable, Inject } from '@angular/core';
import { SelectedDietCookieName } from './Infrastructure/Consts';
import { Observable, of, interval, Subject, BehaviorSubject } from 'rxjs';
import { DietsSheetNames } from './Models/DietsSheetNames';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { map, shareReplay, subscribeOn, flatMap } from 'rxjs/operators';
import { Mapper } from './Infrastructure/Mapper';
import { AVAILABLE_DIETS_MAPPER_TOKEN } from './Infrastructure/InjectionTokens';
import { SpreadsheetApiModel } from './Models/SpreadsheetApiModel';
import { LocalStorageService } from './local-storage.service';
import { CookieService } from 'ngx-cookie-service';
import { DietHarmonogramService } from './diet-harmonogram.service';
import { StringHelper } from './Infrastructure/HelperMethods';

@Injectable({
  providedIn: 'root'
})
export class AvailableDietsService {

  private selectDietNameBehaviorSubject$: BehaviorSubject<string>;
  private cache$: Observable<DietsSheetNames[]>;

  constructor(
    private cookieService: CookieService,
    private localStorageService: LocalStorageService,
    private client: HttpClient,
    private config: ConfigService,
    @Inject(AVAILABLE_DIETS_MAPPER_TOKEN) private mapper: Mapper<DietsSheetNames>,
    private dietHarmonogramService: DietHarmonogramService) {
      this.selectDietNameBehaviorSubject$ = new BehaviorSubject(null);
    }

  getDietname(): Observable<string> {
    this.selectDietNameBehaviorSubject$ = new BehaviorSubject(null);

    return  this.selectDietNameBehaviorSubject$.pipe(
      flatMap(x => {
        console.log(`value in beh subject ${x}`);
        return StringHelper.isNullOrEmpty(x)
          ? this.getInitValueDietName()
          : of(x);
      })
    );
  }


  getAvailableDietList(): Observable<DietsSheetNames[]> {

    if (this.cache$ == null) { // double equality marks check for null and undefined as well
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
          console.log('DietsSheetTable INVOKED')
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
      console.log(`adding value to subject: ${value}`)
      this.selectDietNameBehaviorSubject$.next(value);
      this.cookieService.set(SelectedDietCookieName, value);
    }
  }

  private getInitValueDietName(): Observable<string> {
    const selectedDiet = this.cookieService.get(SelectedDietCookieName);
    console.log(`START getSelectedDietName diet from Cookie: ${selectedDiet}`);
    if (selectedDiet) {
      return of(selectedDiet);
    }

    return this.getAvailableDietList().pipe(
      map(x => {
        const latestDiet = this.getLastElementInArr(x);
        this.setDefaultCookieValue(latestDiet);
        console.log(`START getSelectedDietName diet from httpGET: ${latestDiet.id}`);
        return latestDiet.id;
      })
    );
  }

  private setDefaultCookieValue(x: DietsSheetNames) {
    //this.setCookie(x.id);
    console.log('setDefaultCookieValue invoked')
    //this.dietHarmonogramService.refillCache = true;
    //this.selectDietNameBehaviorSubject$.next(x.id);
    this.cookieService.set(SelectedDietCookieName, x.id);
  }

  private getLastElementInArr(x: DietsSheetNames[]): DietsSheetNames {
    return x[x.length - 1];
  }

}
