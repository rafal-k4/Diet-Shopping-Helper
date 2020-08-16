import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDietComponent } from './select-diet.component';

describe('SelectDietComponent', () => {
  let component: SelectDietComponent;
  let fixture: ComponentFixture<SelectDietComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectDietComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
