import { DataTablesModule } from 'angular-datatables';
import { CreateStudentComponent } from './create-student/create-student.component';
import { ListStudentsComponent } from './list-students/list-students.component';
import { HeaderModule } from './../../../components/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentsPageRoutingModule } from './students-routing.module';

import { StudentsPage } from './students.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderModule,
    DataTablesModule,
    ReactiveFormsModule,
    StudentsPageRoutingModule
  ],
  declarations: [
    StudentsPage,
    ListStudentsComponent,
    CreateStudentComponent
  ]
})
export class StudentsPageModule {}
