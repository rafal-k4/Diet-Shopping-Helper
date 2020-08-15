import { AppSettingsModel } from '../Models/AppSettingsModel';


export const SpreadsheetBaseUrl = 'https://sheets.googleapis.com/v4/spreadsheets/';

export const MobileScreenSize = 700;

export const APP_CONFIG: AppSettingsModel = {

  sheetId: 'AIzaSyCEfV9fj_hT',
  dictionaryId: 'UJyzh9B_Y8r81Bp1Qzci6Hc',

  SpreadSheets: {
    Dictionary: {
      Id: '1BTNFS1nT6swNb_tECK7RoGRqH6nPtmCJQbOaW1wLcNI',
      SheetsCount: 1,
      SheetsNames: ['ProdDict'],
      HeadersRowsCount: 1
    },
    DietHarmonogram: {
      Id: '1jSzKfMkQ6v5tB9Rz85uLRqAcPmbKJdbgLELJ40NwR88',
      SheetsCount: 1,
      SheetsNames: ['Variant_1'],
      HeadersRowsCount: 1
    },
    AvailableDiets: {
      Id: '1kL8IZv1qN5bJobg97jxJhE9jgx84w7rZv3h3XSmDXfU',
      SheetsCount: 1,
      SheetsNames: ['DietsSheetTable'],
      HeadersRowsCount: 1
    }
  }
};





