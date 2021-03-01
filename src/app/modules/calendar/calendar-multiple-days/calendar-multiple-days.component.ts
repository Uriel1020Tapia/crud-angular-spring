import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from '@syncfusion/ej2-angular-calendars';
import * as moment from 'moment';
import { loadCldr, L10n } from "@syncfusion/ej2-base";
import { PrimeNGConfig } from 'primeng/api';

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

  es: any;

  @Input() date: Date[];
  @Input() nameMonth: string;
  @Input() yearSelected:number;

  @Input() minDate: Date;

  @Input() maxDate: Date;

  constructor(
    private primeNGConfig: PrimeNGConfig,
  ) {
    this.primeNGConfig.setTranslation(
      {
        // firstDayOfWeek: ['1',''],
        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Limpiar',
      }
    );
  }

  ngOnInit(): void {


  }


}
