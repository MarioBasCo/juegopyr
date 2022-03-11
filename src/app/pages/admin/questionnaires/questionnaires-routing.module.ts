import { CreateQuestionsComponent } from './create-questions/create-questions.component';
import { CreateQuizzComponent } from './create-quizz/create-quizz.component';
import { ListQuestionnairesComponent } from './list-questionnaires/list-questionnaires.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionnairesPage } from './questionnaires.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionnairesPage,
    children: [
      {
        path: '',
        component: ListQuestionnairesComponent
      },
      {
        path: 'quizz', component: CreateQuizzComponent
      },
      {
        path: 'questions', component: CreateQuestionsComponent
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionnairesPageRoutingModule {}
