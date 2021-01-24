import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimengCalendarComponent } from './primeng-calendar.component';

describe('PrimengCalendarComponent', () => {
  let component: PrimengCalendarComponent;
  let fixture: ComponentFixture<PrimengCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimengCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimengCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
