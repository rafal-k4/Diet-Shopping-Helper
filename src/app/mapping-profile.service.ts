import { Injectable } from '@angular/core';
import appSettings from '../assets/appsettings.json';
import { AppSettingsModel, SpreadSheet } from './Models/AppSettingsModel.js';

@Injectable({
  providedIn: 'root'
})
export class MappingProfileService {

  private settings: AppSettingsModel;

  public get ApiKey(): string {
    return this.settings.ApiKey;
  }

  public get SpreadSheets(): SpreadSheet {
    return this.settings.SpreadSheets;
  }

  constructor() {
    this.settings = appSettings as AppSettingsModel;
  }


}
