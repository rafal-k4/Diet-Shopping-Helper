export interface AppSettingsModel {
  SpreadSheets: SpreadSheet;
  sheetId: string;
  dictionaryId: string;
}

export interface SpreadSheet {
  Dictionary: Sheet;
  DietHarmonogram: Sheet;
  AvailableDiets: Sheet;
}

interface Sheet {
  Id: string;
  SheetsCount: number;
  SheetsNames: [string];
  HeadersRowsCount: number;
}
