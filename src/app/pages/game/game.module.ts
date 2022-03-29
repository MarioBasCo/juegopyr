import { FooterGameModule } from './../../components/footer-game/footer-game.module';
import { HeaderGameModule } from './../../components/header-game/header-game.module';
import { FooterModule } from './../../components/footer/footer.module';
import { ComodinComponent } from './../../modals/comodin/comodin.component';
import { CongratulationsComponent } from './../../modals/congratulations/congratulations.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GamePageRoutingModule } from './game-routing.module';

import { GamePage } from './game.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HeaderGameModule,
    FooterGameModule,
    GamePageRoutingModule
  ],
  declarations: [GamePage, CongratulationsComponent, ComodinComponent]
})
export class GamePageModule {}
