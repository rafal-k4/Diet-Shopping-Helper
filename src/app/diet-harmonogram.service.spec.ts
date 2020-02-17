import { TestBed } from '@angular/core/testing';

import { DietHarmonogramService } from './diet-harmonogram.service';

describe('DietHarmonogramService', () => {
  let service: DietHarmonogramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DietHarmonogramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
