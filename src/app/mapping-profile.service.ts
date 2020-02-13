import { Injectable } from '@angular/core';
import appSettings  from '../assets/appsettings.json';

@Injectable({
  providedIn: 'root'
})
export class MappingProfileService {



  constructor() {
    console.log(appSettings);
  }
}
