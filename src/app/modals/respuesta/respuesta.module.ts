import { IonicModule } from '@ionic/angular';
import { RespuestaComponent } from './respuesta.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [RespuestaComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [RespuestaComponent]
})
export class RespuestaModule { }
