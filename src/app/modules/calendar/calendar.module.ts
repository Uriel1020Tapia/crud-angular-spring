import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CalendarMultipleDaysComponent } from './calendar-multiple-days/calendar-multiple-days.component';
import { PrimengCalendarComponent } from './primeng-calendar/primeng-calendar.component';
import { CalendarRoutingModule } from './calendar-routing.module';



@NgModule({
  declarations: [CalendarMultipleDaysComponent, PrimengCalendarComponent],
  imports: [
    CommonModule,
    SharedModule,
    CalendarRoutingModule
  ]
})
export class CalendarModule { }
