export interface AppSettingsModel {
  Sheets: Sheets;
  ApiKey: string;
}

interface Sheets {
  Dictionary: Dictionary;

}

interface Dictionary {
  Id: string;
  SheetsCount: number;
  SheetsNames: [string];
}
