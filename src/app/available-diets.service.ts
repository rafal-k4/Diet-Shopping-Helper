import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SelectedDietCookieName } from './Infrastructure/Consts';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvailableDietsService {

  constructor(private cookieService: CookieService) { }

  getSelectedDiet(): string {

    if(this.cookieService.check(SelectedDietCookieName)){
      return this.cookieService.get(SelectedDietCookieName);
    }
    

  }

  getAvailableDietList(): Observable<
}
