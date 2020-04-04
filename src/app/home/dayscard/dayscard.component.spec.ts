import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayscardComponent } from './dayscard.component';

describe('DayscardComponent', () => {
  let component: DayscardComponent;
  let fixture: ComponentFixture<DayscardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayscardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayscardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
