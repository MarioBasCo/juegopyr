import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessageSettingsPage } from './message-settings.page';

const routes: Routes = [
  {
    path: '',
    component: MessageSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessageSettingsPageRoutingModule {}
