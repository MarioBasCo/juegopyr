import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmRecoverPage } from './confirm-recover.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmRecoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmRecoverPageRoutingModule {}
