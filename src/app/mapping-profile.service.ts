import { Injectable } from '@angular/core';
import appSettings from '../assets/appsettings.json';
import { AppSettingsModel } from './Models/AppSettingsModel.js';

@Injectable({
  providedIn: 'root'
})
export class MappingProfileService {

  private settings: AppSettingsModel;

  public ApiKey = this.settings.ApiKey;
  

  constructor() {
    this.settings = appSettings as AppSettingsModel;
  }
}
