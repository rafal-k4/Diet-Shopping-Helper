export interface AppSettingsModel {
  SpreadSheets: SpreadSheet;
  ApiKey: string;
}

export interface SpreadSheet {
  Dictionary: Sheet;
  DietHarmonogram: Sheet;
}

interface Sheet {
  Id: string;
  SheetsCount: number;
  SheetsNames: [string];
  HeadersRowsCount: number;
}
