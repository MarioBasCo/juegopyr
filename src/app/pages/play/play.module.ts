import { FooterGameModule } from './../../components/footer-game/footer-game.module';
import { HeaderGameModule } from './../../components/header-game/header-game.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayPageRoutingModule } from './play-routing.module';

import { PlayPage } from './play.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderGameModule,
    FooterGameModule,
    PlayPageRoutingModule
  ],
  declarations: [PlayPage]
})
export class PlayPageModule {}
