import { CreateGroupComponent } from './create-group/create-group.component';
import { ListGroupsComponent } from './list-groups/list-groups.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupsPage } from './groups.page';

const routes: Routes = [
  {
    path: '',
    component: GroupsPage,children: [
      {
        path: '',
        component: ListGroupsComponent
      },
      {
        path: 'create-group',
        component: CreateGroupComponent 
      },
      { 
        path: 'edit-group/:id', 
        component: CreateGroupComponent 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsPageRoutingModule {}
