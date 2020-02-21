import { Injectable } from '@angular/core';
import { AppSettingsModel } from './Models/AppSettingsModel';



@Injectable({
  providedIn: 'root',
  useValue: ''
})
export class ConfigService {

  constructor(private appConfigModel: AppSettingsModel, private spreadsheetBaseUrl: string) {
  }

  private settings: AppSettingsModel;

  public get baseSpreadsheetUrl(): string {
    return this.spreadsheetBaseUrl;
  }

  public get appConfig(): AppSettingsModel {
    return this.appConfigModel;
  }
}
