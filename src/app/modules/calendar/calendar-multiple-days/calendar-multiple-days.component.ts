import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from '@syncfusion/ej2-angular-calendars';
import * as moment from 'moment';
import { loadCldr, L10n } from "@syncfusion/ej2-base";

declare var require: any;
loadCldr(
  require('cldr-data/supplemental/numberingSystems.json'),
  require('cldr-data/main/de/ca-gregorian.json'),
  require('cldr-data/main/de/numbers.json'),
  require('cldr-data/main/de/timeZoneNames.json'),
  require('cldr-data/supplemental/weekdata.json')); // To load the culture based first day of week

@Component({
  selector: 'app-calendar-multiple-days',
  templateUrl: './calendar-multiple-days.component.html',
  styleUrls: ['./calendar-multiple-days.component.scss']
})
export class CalendarMultipleDaysComponent implements OnInit {

  public month: number = new Date().getMonth();
  public fullYear: number = new Date().getFullYear();
  public dateValue: Date = new Date(this.fullYear, this.month , 11);
  public minDate: Date = new Date(this.fullYear, this.month , 9);
  public maxDate: Date = new Date(this.fullYear, this.month, 15);

  //##########################################################################
  // Multi Select in Angular Calendar component
    //##########################################################################
  public dateValues: Date[] = [new Date('1/1/2021'), new Date('1/15/2021'), new Date('1/3/2021'), new Date('1/25/2021')];
  public dateValues2: string[] = [
    "2021-01-01T06:00:00.000Z",
    "2021-01-03T06:00:00.000Z",
    "2021-01-04T06:00:00.000Z",
    "2021-01-05T06:00:00.000Z",
    "2021-01-08T06:00:00.000Z",
    "2021-01-15T06:00:00.000Z",
    "2021-01-25T06:00:00.000Z",
  ];
  public multiSelect: Boolean = true;
  public dateValueLocale: Object = new Date();

  //##########################################################################
  // Select a sequence of dates in Calendar in Angular Calendar component
  //##########################################################################
  @ViewChild('ejCalendar')
  public CalendarInstance: CalendarComponent;
  /*selected current week dates when click the button*/
  workWeek() {
      if (this.CalendarInstance.element.classList.contains('week')) {
          this.CalendarInstance.element.classList.remove('week')
      }
      this.CalendarInstance.element.classList.add('workweek');
  }

  week() {
      if (this.CalendarInstance.element.classList.contains('workweek')) {
          this.CalendarInstance.element.classList.remove('workweek')
      }
      this.CalendarInstance.element.classList.add('week');
  }

  onChange(args) {
    console.log("args",args);
    
      // var startOfWeek = moment(args.value).startOf('week');
      // var endOfWeek = moment(args.value).endOf('week');
      // if (this.CalendarInstance.element.classList.contains('workweek')) {
      //     this.getWeekArray(startOfWeek.day(1), endOfWeek.day(5), this);
      // } else if (this.CalendarInstance.element.classList.contains("week")) {
      //     this.getWeekArray(startOfWeek, endOfWeek, this);
      // }
      var date = new Date(args.value);

  console.log(date.getFullYear() + '-' + date.getMonth()+1 + '-' + date.getDate())

    console.log(args.value);

    let dateFormat =`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    this.dateValues.push( new Date(date.getFullYear(), date.getMonth(), date.getDate()))
    
  }

  getWeekArray(startOfWeek, endOfWeek, obj) {
      var days = [];
      var day = startOfWeek;
      while (day <= endOfWeek) {
          days.push(day.toDate());
          day = day.clone().add(1, 'd');
      }
      obj.CalendarInstance.values = days;
  }
  //##########################################################################
  // Change the first day of week in Angular Calendar component<
    //##########################################################################
  public startWeek: number = 0; // Day of the week starts from 0(Sunday) to 6(Saturday).

  //##########################################################################
  // JSON Data binding with Calendar in Angular Calendar component
    //##########################################################################

    onChange2(args) {
      console.log(args);

      this.dateValues.push(args.value.toDate());
  }

  constructor() { }

  ngOnInit(): void {
        /*loads the localization text*/
        L10n.load({
          'es': {
            'calendar': {
               today:"Hoy"
            }
          }
        });
  }

  // onAddDate(){
  //   console.log("add");
  // }
  submit(){
    let req ={
      values:this.dateValues
    }
    console.log(req);
  }
}
