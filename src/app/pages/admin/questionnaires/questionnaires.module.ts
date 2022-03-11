import { DataTablesModule } from 'angular-datatables';
import { ListQuestionsComponent } from './list-questions/list-questions.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderModule } from './../../../components/header/header.module';

import { QuestionnairesPageRoutingModule } from './questionnaires-routing.module';

import { QuestionnairesPage } from './questionnaires.page';
import { ListQuestionnairesComponent } from './list-questionnaires/list-questionnaires.component';
import { CreateQuizzComponent } from './create-quizz/create-quizz.component';
import { CreateQuestionsComponent } from './create-questions/create-questions.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderModule,
    ReactiveFormsModule,
    DataTablesModule,
    QuestionnairesPageRoutingModule
  ],
  declarations: [
    QuestionnairesPage, 
    ListQuestionnairesComponent, 
    CreateQuizzComponent,
    CreateQuestionsComponent,
    ListQuestionsComponent
  ]
})
export class QuestionnairesPageModule {}
