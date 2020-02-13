import { TestBed } from '@angular/core/testing';

import { MappingProfileService } from './mapping-profile.service';

describe('MappingProfileService', () => {
  let service: MappingProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MappingProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
