import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
      },
      {
        path: 'questionnaires',
        loadChildren: () => import('./questionnaires/questionnaires.module').then( m => m.QuestionnairesPageModule)
      },
      {
        path: 'students',
        loadChildren: () => import('./students/students.module').then( m => m.StudentsPageModule)
      },
      {
        path: 'groups',
        loadChildren: () => import('./groups/groups.module').then( m => m.GroupsPageModule)
      },
      {
        path: 'message-settings',
        loadChildren: () => import('./message-settings/message-settings.module').then( m => m.MessageSettingsPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
