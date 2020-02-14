export interface AppSettingsModel {
  SpreadSheets: SpreadSheet;
  ApiKey: string;
}

export interface SpreadSheet {
  Dictionary: Dictionary;

}

interface Dictionary {
  Id: string;
  SheetsCount: number;
  SheetsNames: [string];
  HeadersRowsCount: number;
}
