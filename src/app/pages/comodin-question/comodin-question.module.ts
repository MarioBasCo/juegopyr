import { HeaderGameModule } from './../../components/header-game/header-game.module';
import { FooterGameModule } from './../../components/footer-game/footer-game.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComodinQuestionPageRoutingModule } from './comodin-question-routing.module';

import { ComodinQuestionPage } from './comodin-question.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HeaderGameModule,
    FooterGameModule,
    ComodinQuestionPageRoutingModule
  ],
  declarations: [ComodinQuestionPage]
})
export class ComodinQuestionPageModule {}
