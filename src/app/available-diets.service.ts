import { Injectable, Inject } from '@angular/core';
import { SelectedDietCookieName } from './Infrastructure/Consts';
import { Observable, of } from 'rxjs';
import { DietsSheetNames } from './Models/DietsSheetNames';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { map } from 'rxjs/operators';
import { Mapper } from './Infrastructure/Mapper';
import { AVAILABLE_DIETS_MAPPER_TOKEN } from './Infrastructure/InjectionTokens';
import { SpreadsheetApiModel } from './Models/SpreadsheetApiModel';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AvailableDietsService {

  constructor(
    private localStorageService: LocalStorageService,
    private client: HttpClient,
    private config: ConfigService,
    @Inject(AVAILABLE_DIETS_MAPPER_TOKEN) private mapper: Mapper<DietsSheetNames>) { }

  getSelectedDietName(): Observable<string> {

    const selectedDiet = this.localStorageService.get(SelectedDietCookieName);

    if (selectedDiet) {
      return of(selectedDiet);
    }

    return this.getAvailableDietList()
      .pipe(
        map(x => {
          const latestDiet = this.getLastElementInArr(x);
          console.log("SECOND MAP, latest diet: ", latestDiet, "all diets:", x );
          this.setDefaultCookieValue(latestDiet);
          return latestDiet.id;
        })
      );
  }

  getAvailableDietList(): Observable<DietsSheetNames[]> {

    return this.client.get<SpreadsheetApiModel>(
      `${this.config.baseSpreadsheetUrl}`
      + `${this.config.appConfig.SpreadSheets.AvailableDiets.Id}/values/`
      + `${this.config.appConfig.SpreadSheets.AvailableDiets.SheetsNames[0]}`
      + `?key=${this.config.appConfig.sheetId}`
      + `${this.config.appConfig.dictionaryId}`
    ).pipe(
      map(x => {
        const rows = x.values;
        const headers = rows.shift();
        console.log("Inside getAvailableDietList all diets:", x, headers);

        const result = this.mapper.toModel(headers, rows);

        console.log("MAPPER RESULT: ", result);
        return result;
      })
    )
  }

  setCookie(value: any) {
    if (value) { //is not empty
      this.localStorageService.set(SelectedDietCookieName, value);
    }
  }

  private setDefaultCookieValue(x: DietsSheetNames) {
    console.log("set default cookie", x.id);
    this.setCookie(x.id);
  }

  private getLastElementInArr(x: DietsSheetNames[]): DietsSheetNames {
    return x[x.length - 1];
  }

}
