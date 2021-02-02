import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  listDaysDisabled: Array<string> = ['01/27/2022','02/22/2022','02/23/2022','02/11/2022']
  constructor() { }

  getlistDaysDisabled() {
    return of(this.listDaysDisabled).pipe(delay(5000));
  }
}
