import { HeaderModule } from './../../../components/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessageSettingsPageRoutingModule } from './message-settings-routing.module';

import { MessageSettingsPage } from './message-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderModule,
    MessageSettingsPageRoutingModule
  ],
  declarations: [MessageSettingsPage]
})
export class MessageSettingsPageModule {}
