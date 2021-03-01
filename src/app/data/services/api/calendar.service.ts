import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  listNotWorkingDaysOfTheYear:string[] = [];

  constructor() { }

    /**
  * Get list of non-working days of the year
  * @param year number;
  */
  getlistDaysDisabled(year:number) {

    switch(year){
      case 2020:
          this.listNotWorkingDaysOfTheYear = ['01/10/2020','02/11/2020','02/12/2020','03/13/2020'];
        break;
      case 2021:
        this.listNotWorkingDaysOfTheYear = ['02/02/2021','02/03/2021','02/04/2021','03/05/2021'];
          break;
      case 2022:
        this.listNotWorkingDaysOfTheYear = ['01/20/2022','02/21/2022','02/22/2022','03/23/2022'];
        break;
    }
    return of(this.listNotWorkingDaysOfTheYear).pipe(delay(5000));
  }
}
