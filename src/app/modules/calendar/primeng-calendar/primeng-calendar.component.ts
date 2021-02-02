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
searchForm: FormGroup;
calendarForm: FormGroup;
listNextYears:number[] = [];

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
    // this.es = {
    //   firstDayOfWeek: 1,
    //   dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
    //   dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
    //   dayNamesMin: [ "D","L","M","X","J","V","S" ],
    //   monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
    //   monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
    //     today: 'Hoy',
    //     clear: 'Borrar'
    // };
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
    
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month -1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);



    // let todayCustom = new Date();
    // let monthCustom  = todayCustom.getMonth();
    // this.maxDate = new Date();
    // this.maxDate.setMonth(monthCustom);

    // let todayMin= new Date();
    // let monthMinCustom  = todayMin.getMonth();
    // this.minDate = new Date();
    // this.minDate.setMonth(monthMinCustom);


    console.log("today",today);
    console.log("month",month);
    console.log("year",year);
    console.log("prevMonth",prevMonth);
    console.log("prevYear",prevYear);
    console.log("nextMonth",nextMonth);
    console.log("nextYear",nextYear);

    
    // this.minDate = new Date();
    // this.minDate.setMonth(prevMonth);
    // this.minDate.setFullYear(prevYear);
    // this.maxDate = new Date();
    // this.maxDate.setMonth(nextMonth);
    // this.maxDate.setFullYear(nextYear);
    
    let invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [today,invalidDate];
  }

  //Inicializar formulario 
  inizialiteForm(){
      this.searchForm = this.fb.group({
        year: [this.getYearCurrent(), [Validators.required, Validators.minLength(4),Validators.maxLength(25)]]
      });

      this.calendarForm = this.fb.group({
        listFebruary: this.datesFebruary
      });
      

      this.getFollowingYearsFromThePresent();
      this.getFollowingYearsFromThePresentMoment();
  }

  getYearCurrent(){
    return new Date().getFullYear();
  }
  getMonthCurrent(){
    return new Date().getMonth();
  }
  //Obtener años siguientes apartir del actual
  getFollowingYearsFromThePresent(){

    const format = 'MM-DD-YYYY'
    const hoy = moment();
    const ayer = hoy.clone().subtract(1,'days');
    const manana = hoy.clone().add(1,'days');
    const fechaExacta = moment(hoy.format(format));
    const fechaExacta2 = moment([2021,0]);

    const mesDias = moment([2021,1]).daysInMonth()

    console.table({
      hoy1:hoy.toDate(),
      hoy: hoy.format(format),
      ayer:ayer.format(format),
      manana:manana.format(format),
      fechaExacta:fechaExacta.format(format),
      fechaExacta2:fechaExacta2.format(format),
      mesDias:mesDias,
      mayor: (hoy > ayer) ? true:false,
      momentdate:moment().date()
    });



    // var listNextYears=[];
    // let currentYear = new Date().getFullYear();
    // let next_Year = new Date();
    // console.log("Anio actual",currentYear);

    // for(let i= 0; i <= 3; i++){
    //   next_Year.setFullYear(currentYear + i);
    //   listNextYears.push(next_Year.getFullYear());
    //   // this.listNextYears.push(next_Year.getFullYear());
    // }

    // console.log("listNextYears",listNextYears)
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
    console.log("listNextYears moment",listNextYears);
    
  }


  onChangeYear($event){
    console.log("evento",$event.target.value);

    


    this.showCalendar(parseInt(this.f.year.value));

  }

  onSubmit(){
        // stop here if form is invalid
        if (this.searchForm.invalid) {
          return;
      }

      console.info('request ==>!' , this.searchForm.value);


  }

  showCalendar(year){
    this.spinner.show();
    let listaDiasInhabilesApi =[];

    console.log("Año recibido",year);

    if(year === 2022){
      
      console.log("--- anio 2022 selected---");
      this.datesJunuary =[];
      this.datesFebruary =[];
      this.calendarService.getlistDaysDisabled().subscribe(resp => {
 
        console.log("resp service",resp);

        listaDiasInhabilesApi = resp;
        for(let i=0; i < listaDiasInhabilesApi.length; i++){
          let mes = parseInt(listaDiasInhabilesApi[i].split('/')[0]);
          let dia = parseInt(listaDiasInhabilesApi[i].split('/')[1]);
          let anio = parseInt(listaDiasInhabilesApi[i].split('/')[2]);
    
          console.log("dia",dia);
          console.log("mes",mes);
          console.log("anio",anio);
    
          
          switch (mes){
            case 1:
              let dateEne = `${mes}/${dia}/${anio}`
              this.datesJunuary = this.datesJunuary.concat(new Date(dateEne));
              break;
            case 2:
              let dateFeb = `${mes}/${dia}/${anio}`
              this.datesFebruary =this.datesFebruary.concat(new Date(dateFeb));
              break;
          }
          console.log("datesJunuary",i,this.datesJunuary);
          
        }
        this.spinner.hide();
        this.showCardCalendar = true;
      })


      

    }else{
      console.log("anio 2021");
      this.spinner.hide();
    }
   

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
