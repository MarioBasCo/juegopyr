import { FooterGameModule } from './../../components/footer-game/footer-game.module';
import { HeaderGameModule } from './../../components/header-game/header-game.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComodinResultPageRoutingModule } from './comodin-result-routing.module';

import { ComodinResultPage } from './comodin-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderGameModule,
    FooterGameModule,
    ComodinResultPageRoutingModule
  ],
  declarations: [ComodinResultPage]
})
export class ComodinResultPageModule {}
