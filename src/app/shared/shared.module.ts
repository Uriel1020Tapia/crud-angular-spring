import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import * as fromComponents from './components';

import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListModule} from '@syncfusion/ej2-angular-dropdowns';
import { CalendarModule } from 'primeng/calendar';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [...fromComponents.components, ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    NgbModule,
    RouterModule,
    CalendarModule,
    DropDownListModule,
  ],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    NgbModule,
    RouterModule,
    CalendarModule ,
    ...fromComponents.components
  ]
})
export class SharedModule { }
