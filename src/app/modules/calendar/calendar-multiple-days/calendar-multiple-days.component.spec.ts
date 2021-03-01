import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarMultipleDaysComponent } from './calendar-multiple-days.component';

describe('CalendarMultipleDaysComponent', () => {
  let component: CalendarMultipleDaysComponent;
  let fixture: ComponentFixture<CalendarMultipleDaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarMultipleDaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarMultipleDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
