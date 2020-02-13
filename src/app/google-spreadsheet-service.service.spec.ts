import { TestBed } from '@angular/core/testing';

import { GoogleSpreadsheetServiceService } from './google-spreadsheet-service.service';

describe('GoogleSpreadsheetServiceService', () => {
  let service: GoogleSpreadsheetServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleSpreadsheetServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
