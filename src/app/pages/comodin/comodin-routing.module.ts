import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComodinPage } from './comodin.page';

const routes: Routes = [
  {
    path: '',
    component: ComodinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComodinPageRoutingModule {}
