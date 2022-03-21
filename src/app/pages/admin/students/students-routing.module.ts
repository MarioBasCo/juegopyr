import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateStudentComponent } from './create-student/create-student.component';
import { ListStudentsComponent } from './list-students/list-students.component';

import { StudentsPage } from './students.page';

const routes: Routes = [
  {
    path: '',
    component: StudentsPage,
    children: [
      {
        path: '',
        component: ListStudentsComponent
      },
      {
        path: 'create-student',
        component: CreateStudentComponent,
      },
      {
        path: 'edit-student/:id',
        component: CreateStudentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsPageRoutingModule {}
