import { Injectable } from '@angular/core';
import appSettings from '../assets/appsettings.json';
import { AppSettingsModel, Sheets } from './Models/AppSettingsModel.js';

@Injectable({
  providedIn: 'root'
})
export class MappingProfileService {

  private settings: AppSettingsModel;

  public get ApiKey(): string {
    return this.settings.ApiKey;
  }

  public get Sheets(): Sheets {
    return this.settings.Sheets;
  }



  constructor() {
    this.settings = appSettings as AppSettingsModel;
  }
}
