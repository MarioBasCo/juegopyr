import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmRecoverPageRoutingModule } from './confirm-recover-routing.module';

import { ConfirmRecoverPage } from './confirm-recover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmRecoverPageRoutingModule
  ],
  declarations: [ConfirmRecoverPage]
})
export class ConfirmRecoverPageModule {}
