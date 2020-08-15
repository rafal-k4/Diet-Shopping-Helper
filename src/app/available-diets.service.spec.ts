import { TestBed } from '@angular/core/testing';

import { AvailableDietsService } from './available-diets.service';

describe('AvailableDietsService', () => {
  let service: AvailableDietsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailableDietsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
