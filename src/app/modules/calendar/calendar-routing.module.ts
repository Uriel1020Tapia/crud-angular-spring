import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarMultipleDaysComponent } from './calendar-multiple-days/calendar-multiple-days.component';
import { PrimengCalendarComponent } from './primeng-calendar/primeng-calendar.component';

const routes: Routes = [

  {
    path: '',
    component: CalendarMultipleDaysComponent
  },
  
  {
    path: 'prime-calendar',
    component: PrimengCalendarComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
