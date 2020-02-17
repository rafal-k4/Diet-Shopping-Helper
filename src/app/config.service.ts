import { Injectable } from '@angular/core';
import { AppSettingsModel, SpreadSheet } from './Models/AppSettingsModel';
import appSettings from '../assets/appsettings.json';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

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
