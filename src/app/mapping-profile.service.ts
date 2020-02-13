import { Injectable } from '@angular/core';
import appSettings  from '../assets/appsettings.json';
import { AppSettingsModel } from './Models/AppSettingsModel.js';

@Injectable({
  providedIn: 'root'
})
export class MappingProfileService {



  constructor() {

    const settings = appSettings as AppSettingsModel;

  }
}
