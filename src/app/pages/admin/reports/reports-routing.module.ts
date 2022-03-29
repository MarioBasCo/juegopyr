import { ListResultComponent } from './list-result/list-result.component';
import { ResultComponent } from './result/result.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportsPage } from './reports.page';

const routes: Routes = [
  {
    path: '',
    component: ReportsPage,
    children: [
      {
        path: '',
        component: ListResultComponent
      },
      {
        path: 'result/:id',
        component: ResultComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsPageRoutingModule {}
