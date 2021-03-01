import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PdfMakerComponent } from './pdf-maker/pdf-maker.component';

const routes: Routes = [

  {
    path: 'pdf-maker',
    component: PdfMakerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PdfsRoutingModule { }
