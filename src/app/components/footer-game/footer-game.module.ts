import { IonicModule } from '@ionic/angular';
import { FooterGameComponent } from './footer-game.component';
import { FooterModule } from './../footer/footer.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [FooterGameComponent],
  imports: [
    CommonModule,
    IonicModule,
    FooterModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [FooterGameComponent]
})
export class FooterGameModule { }
