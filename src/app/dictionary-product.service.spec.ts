import { TestBed } from '@angular/core/testing';

import { DictionaryProductService } from './dictionary-product.service';

describe('DictionaryProductService', () => {
  let service: DictionaryProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DictionaryProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
