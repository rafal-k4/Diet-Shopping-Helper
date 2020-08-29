import { TestBed } from '@angular/core/testing';

import { DaySelectorService } from './day-selector.service';

describe('DaySelectorService', () => {
  let service: DaySelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DaySelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
