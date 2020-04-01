import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSelectSearchComponent } from './product-select-search.component';

describe('ProductSelectSearchComponent', () => {
  let component: ProductSelectSearchComponent;
  let fixture: ComponentFixture<ProductSelectSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSelectSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSelectSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
