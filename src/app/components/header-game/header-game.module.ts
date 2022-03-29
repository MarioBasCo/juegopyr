import { HeaderGameComponent } from './header-game.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [HeaderGameComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [HeaderGameComponent]
})
export class HeaderGameModule { }
