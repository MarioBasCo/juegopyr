import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComodinQuestionPage } from './comodin-question.page';

const routes: Routes = [
  {
    path: '',
    component: ComodinQuestionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComodinQuestionPageRoutingModule {}
