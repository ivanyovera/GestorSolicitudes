import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudesTableComponent } from './components/solicitudes-table/solicitudes-table.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    SolicitudesTableComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    SolicitudesTableComponent
  ]
})
export class SolicitudesModule { }
