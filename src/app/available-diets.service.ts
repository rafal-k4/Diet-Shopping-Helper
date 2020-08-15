import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AvailableDietsService {

  constructor(private cookieService: CookieService) { }

  setCookie(): void {
    this.cookieService.set('test-cookie-from-angular', 'test value blah blah')
  }
}
