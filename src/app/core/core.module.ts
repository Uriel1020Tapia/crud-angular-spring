import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInteceptor } from './interceptors/error.interceptor';



@NgModule({
  imports: [
    HttpClientModule
  ],
  providers:[
    {
      provide:HTTP_INTERCEPTORS,
      useClass:ErrorInteceptor,
      multi:true
    }
  ]
})
export class CoreModule { }
