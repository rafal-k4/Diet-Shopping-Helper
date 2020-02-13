import { Injectable } from '@angular/core';
import AppSettings  from '../assets/appsettings.json';

@Injectable({
  providedIn: 'root'
})
export class MappingProfileService {



  constructor() {
    console.log(AppSettings);
  }
}
