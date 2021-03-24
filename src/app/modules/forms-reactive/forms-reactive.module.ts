import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '@shared/shared.module';
import { FormsRoutingModule } from './forms-routing.module';



@NgModule({
  declarations: [ RegisterComponent],
  imports: [
    SharedModule,
    FormsRoutingModule
  ]
})
export class FormsReactiveModule { }
