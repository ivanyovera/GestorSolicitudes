import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudesTableComponent } from './components/solicitudes-table/solicitudes-table.component';



@NgModule({
  declarations: [
    SolicitudesTableComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SolicitudesTableComponent
  ]
})
export class SolicitudesModule { }
