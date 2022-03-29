import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComodinResultPage } from './comodin-result.page';

const routes: Routes = [
  {
    path: '',
    component: ComodinResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComodinResultPageRoutingModule {}
