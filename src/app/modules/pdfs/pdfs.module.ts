import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { PdfsRoutingModule } from './pdfs-routing.module';
import { PdfMakerComponent } from './pdf-maker/pdf-maker.component';



@NgModule({
  declarations: [
    PdfMakerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PdfsRoutingModule
  ]
})
export class PdfsModule { }
