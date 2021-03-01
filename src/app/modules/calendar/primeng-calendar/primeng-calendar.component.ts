import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import {PrimeNGConfig} from 'primeng/api';

import * as moment from 'moment';
import { CalendarService } from '@data/services/api/calendar.service';
import { NgxSpinnerService } from "ngx-spinner";
moment.locale('en');

@Component({
  selector: 'app-primeng-calendar',
  templateUrl: './primeng-calendar.component.html',
  styleUrls: ['./primeng-calendar.component.scss']
})
export class PrimengCalendarComponent implements OnInit {



  defaultDate: Date = new Date('1/18/2021');


  dates: Date[] = [new Date('1/1/2021'), new Date('1/15/2021'), new Date('1/3/2021'), new Date('1/25/2021')];

  rangeDates: Date[];
  date14: Date[];
  minDate: Date;

  maxDate: Date;

  invalidDates: Array<Date>;

  es: any;
  timeValue: string;



//###############################################################
//################### PRUEBAS ##########################
//###############################################################


/* ========================================================================
================================ form de busqueda=========================
===========================================================================*/

searchForm: FormGroup;
listNextYears:number[] = [];



calendarForm: FormGroup;

// lista dias inhabiles por mes
// ENERO
datesJunuary: Date[];
minDateJunuary:Date;
maxDateHJunuary:Date;
// FEBRERO
datesFebruary: Date[];
minDateFebruary:Date;
maxDateHFebruary:Date;
// MARZO
datesMarch: Date[];
minDateMarch:Date;
maxDateHMarch:Date;
//ABRIL
datesApril: Date[];
datesMay: Date[];
datesJune: Date[];
datesJuly: Date[];
datesAugust: Date[];
datesSeptember: Date[];
datesOctober: Date[];
datesNovember: Date[];
datesDecember: Date[];

showCardCalendar: boolean = false;


// Inject PrimeNgConfig
constructor(
  private fb: FormBuilder,
  private calendarService:CalendarService,
  private primeNGConfig: PrimeNGConfig,
  private spinner: NgxSpinnerService) {

  this.inizialiteForm();

}

  ngOnInit(): void {
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

  //Inicializar formulario
  inizialiteForm(){
      this.searchForm = this.fb.group({
        year: [this.getYearCurrent(), [Validators.required, Validators.minLength(4),Validators.maxLength(25)]]
      });

      this.calendarForm = this.fb.group({
        listFebruary: this.datesFebruary
      });

      this.loadYears();
  }

  getYearCurrent(){
    return new Date().getFullYear();
  }
  getMonthCurrent(){
    return new Date().getMonth();
  }


  loadYears(){
    const currentDate = moment();
    let years = null;

    let getYearPrevius =  currentDate.clone().subtract(1,'years');

    this.listNextYears.push(getYearPrevius.year());

    for(let i= 0; i <= 4; i++){

      years =  currentDate.clone().add(i,'years');
      this.listNextYears.push(years.year());
    }
    console.log("listNextYears moment",this.listNextYears);

  }


  onChangeYear($event){
    console.log("request ==>",$event.target.value);
    this.buildCalendar(+this.f.year.value);

  }

  onSubmit(){
        // stop here if form is invalid
        if (this.searchForm.invalid) {
          return;
      }

      console.info('request ==>!' , this.searchForm.value);
  }

  buildCalendar(year:number){
    this.spinner.show();
    console.log("Año recibido",year);

    let listDaysNotWorking =[];

    this.calendarService.getlistDaysDisabled(year).subscribe(data => {

      console.log(`Días inhabiles del año ${year} ${data}`);

      listDaysNotWorking = data;

      this.separateDates(listDaysNotWorking);

    });
  }

  separateDates(listDaysNotWorking:string[]){

    this.datesJunuary =[];
    this.datesFebruary =[];
    this.datesMarch = [];
    this.datesApril  =[];
    this.datesMay = [];
    this.datesJune =[];

    for(let i=0; i < listDaysNotWorking.length; i++){

            let mes = parseInt(listDaysNotWorking[i].split('/')[0]);
            let dia = parseInt(listDaysNotWorking[i].split('/')[1]);
            let anio = parseInt(listDaysNotWorking[i].split('/')[2]);

            // console.log("dia ==>",dia);
            // console.log("mes ==>",mes);
            // console.log("anio  ==>",anio);



            switch (mes){
              case 1:
               console.log(moment().month(mes).format("MMMM"));
                // this.datesJunuary = this.datesJunuary.concat(new Date(`${mes}/${dia}/${anio}`));
                let dateConverter =new Date(`${mes}/${dia}/${anio}`);
                console.log("dateConverter",dateConverter);

                this.datesJunuary.push(dateConverter);

                break;
              case 2:

                // this.datesFebruary =this.datesFebruary.concat(new Date(`${mes}/${dia}/${anio}`));
                let dateConverter2 =new Date(`${mes}/${dia}/${anio}`);
                console.log("dateConverter2",dateConverter2);
                this.datesFebruary.push(dateConverter2);
                break;
              case 3:

                // this.datesMarch =this.datesMarch.concat(new Date(`${mes}/${dia}/${anio}`));
                this.datesMarch.push(new Date(`${mes}/${dia}/${anio}`));
                break;
              case 4:
                // this.datesApril =this.datesApril.concat(new Date(`${mes}/${dia}/${anio}`));
                this.datesApril.push(new Date(`${mes}/${dia}/${anio}`));
                break;
              case 5:

                this.datesMay =this.datesMay.concat(new Date(`${mes}/${dia}/${anio}`));
                break;
              case 6:
                this.datesJune =this.datesJune.concat(new Date(`${mes}/${dia}/${anio}`));
                break;
            }
      }

      console.log(this.datesJunuary)
      console.log(this.datesFebruary)
      console.log(this.datesMarch)
      console.log(this.datesApril)
      console.log(this.datesMay)
      console.log(this.datesJune)
      this.showCardCalendar =  true;
      this.spinner.hide();
  }

  get f(){
    return this.searchForm.controls;
  }

  enviar(){
    console.log("dias seleccionados",this.datesJunuary);

    let request = {
      anio:this.f.year.value,
      listDaysDisabled :    this.joinDaysSelected(),
      // listFebruary:this.formatDaysSelectedToString()
    }

    console.log("request final ==>",request);

  }

  joinDaysSelected(){
    let diasInhabiles = [];
    diasInhabiles = diasInhabiles.concat(this.formatDaysSelectedToString(this.datesJunuary));
    diasInhabiles =  diasInhabiles.concat(this.formatDaysSelectedToString(this.calendarForm.get('listFebruary').value));
    diasInhabiles = diasInhabiles.concat(this.formatDaysSelectedToString(this.datesMarch));
    diasInhabiles = diasInhabiles.concat(this.formatDaysSelectedToString(this.datesApril));
    diasInhabiles = diasInhabiles.concat(this.formatDaysSelectedToString(this.datesMay));
    diasInhabiles = diasInhabiles.concat(this.formatDaysSelectedToString(this.datesJune));
    diasInhabiles = diasInhabiles.concat(this.formatDaysSelectedToString(this.datesJuly));
    diasInhabiles = diasInhabiles.concat(this.formatDaysSelectedToString(this.datesAugust));
    diasInhabiles = diasInhabiles.concat(this.formatDaysSelectedToString(this.datesSeptember));
    diasInhabiles = diasInhabiles.concat(this.formatDaysSelectedToString(this.datesOctober));
    diasInhabiles = diasInhabiles.concat(this.formatDaysSelectedToString(this.datesNovember));
    diasInhabiles = diasInhabiles.concat(this.formatDaysSelectedToString(this.datesDecember));
    // console.log("request dias inhabiles ==> ",diasInhabiles);
    return diasInhabiles;
  }
  formatDaysSelectedToString(listDates){
    var diasInhabiles = [];

    if(listDates){
      for(let i=0; i < listDates.length; i++){
        // console.log("moment ===>",moment(listDates[i]).format('L'));
        diasInhabiles.push(moment(listDates[i]).format('L'));
      }
    }

    // console.log("result diasInhabiles",diasInhabiles);
    return diasInhabiles;
  }

  onYearChange($event){
    console.log("onYearChange",$event);
    let dateSelected = $event;
    let fechaExactaInicio;
    let fechaExactaFin ;

    console.log("moment fecha hoy ==>",moment());

    for(let i=0; i <= 11; i++){
      fechaExactaInicio = moment([dateSelected.year,i]);
      fechaExactaFin = moment([dateSelected.year,i]);

      console.log("fechaExactaInicio",fechaExactaInicio);
      console.log("fechaExactaFin",fechaExactaFin);

      const startOfMonth = fechaExactaInicio.startOf('month').format('MM-DD-YYYY');
      const endOfMonth   = fechaExactaFin.endOf('month').format('MM-DD-YYYY');
      console.log("startOfMonth",startOfMonth);
      console.log("endOfMonth",endOfMonth);
      this.getMinMaxDateByMonth(startOfMonth,endOfMonth);


    }



  }

  getMinMaxDateByMonth(starOfMonth,endOfMonth){
    console.log("startOfMonth",starOfMonth);
    console.log("endOfMonth",endOfMonth);
    this.minDateJunuary = new Date();
    this.minDateJunuary.setMonth(11)

    console.log("minDateJunuary",this.minDateJunuary);
  }

onSubmitCalendar(){
  console.log("onSubmitCalendar")
}
}
