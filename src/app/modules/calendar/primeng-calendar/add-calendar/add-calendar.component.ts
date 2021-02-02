import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import {PrimeNGConfig} from 'primeng/api';

import * as moment from 'moment';
import { CalendarService } from '@data/services/api/calendar.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-add-calendar',
  templateUrl: './add-calendar.component.html',
  styleUrls: ['./add-calendar.component.scss']
})
export class AddCalendarComponent implements OnInit {

  //###############################################################
//################### PRUEBAS ##########################
//###############################################################
searchForm: FormGroup;
calendarForm: FormGroup;
listNextYears:number[] = [];

// ENERO
datesJunuary: Date[];
minDateJunuary:Date;
maxDateJunuary:Date;
// FEBRERO
datesFebruary: Date[];
minDateFebruary:Date;
maxDateFebruary:Date;

// Inject PrimeNgConfig
constructor(   
  private fb: FormBuilder,
  private calendarService:CalendarService,
  private primeNGConfig: PrimeNGConfig,
  private spinner: NgxSpinnerService) {

  }

  ngOnInit(): void {
    this.primeNGConfig.setTranslation(
      {
        // firstDayOfWeek: ['1',''],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
        dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        today: 'Hoy',
        clear: 'Limpiar',
      }
    );

    this.inizialiteForm();
  }


  getFollowingYearsFromThePresentMoment(){
    let  listNextYears=[];
    const currentDate = moment();
    let next_Year = null;

    for(let i= 0; i <= 3; i++){
      next_Year =  currentDate.clone().add(i,'years');
      listNextYears.push(next_Year.year());
      this.listNextYears.push(next_Year.year());
    }
  }

    //Inicializar formulario 
  inizialiteForm(){
      this.searchForm = this.fb.group({
        year: [this.getYearCurrent(), [Validators.required, Validators.minLength(4),Validators.maxLength(25)]]
      });

      this.getFollowingYearsFromThePresentMoment();
  }
  get f(){
    return this.searchForm.controls;
  }

  getYearCurrent(){
    return new Date().getFullYear();
  }
  getMonthCurrent(){
    return new Date().getMonth();
  }

  onChangeYear($event){
    console.log("evento",$event.target.value);
    this.generateCalendar();
  }


  generateCalendar(){

    let arrayMeses = [];
    let anioCurrent =this.f.year.value;
    let fechaExactaInicio;
    let fechaExactaFin ;

    for(let i=0; i < 12; i++){
      arrayMeses.push(moment().month(i).format('M'));

      fechaExactaInicio = moment([anioCurrent,i]);
      fechaExactaFin = moment([anioCurrent,i]);

      const startOfMonth = fechaExactaInicio.startOf('month').format('MM-DD-YYYY');
      const endOfMonth   = fechaExactaFin.endOf('month').format('MM-DD-YYYY');

      this.getMinMaxDateByMonth(startOfMonth,endOfMonth,i);
    }

    // this.datesJunuary = new Date();
    // this.datesFebruary = new Date();


    console.log("arrayMeses",arrayMeses);
    
  }

  getMinMaxDateByMonth(starOfMonth,endOfMonth,numMes){
    console.log("startOfMonth",starOfMonth);
    console.log("endOfMonth",endOfMonth);

    switch(numMes){
      case 0:
          this.datesJunuary = null;
          this.minDateJunuary = new Date(starOfMonth);
          this.maxDateJunuary = new Date(endOfMonth);
          this.datesJunuary = [new Date(starOfMonth)]
          console.log("minDateJunuary",this.minDateJunuary)
          console.log("maxDateJunuary",this.maxDateJunuary)
       break;
       case 1:
          this.datesFebruary = null;
          this.minDateFebruary= new Date(starOfMonth);
          this.maxDateFebruary= new Date(endOfMonth);
          this.datesFebruary = [ new Date(starOfMonth)];
          console.log("minDateFebruary",this.minDateFebruary)
          console.log("maxDateFebruary",this.maxDateFebruary)
        break;
        default:
          break;
    }

  }

  onSubmit(){}
}
