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
    GamePageRoutingModule
  ],
  declarations: [GamePage, CongratulationsComponent, ComodinComponent]
})
export class GamePageModule {}
