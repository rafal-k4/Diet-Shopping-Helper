export interface AppSettingsModel {
  Sheets: Sheets;
  ApiKey: string;
}

export interface Sheets {
  Dictionary: Dictionary;

}

interface Dictionary {
  Id: string;
  SheetsCount: number;
  SheetsNames: [string];
}
