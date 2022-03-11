import { QuizzService } from './../../../../services/quizz.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-questions',
  templateUrl: './list-questions.component.html',
  styleUrls: ['./list-questions.component.scss'],
})
export class ListQuestionsComponent implements OnInit {
  listPreguntas: any[] = [];

  constructor(private serQuizz: QuizzService) { }

  ngOnInit() {
    this.serQuizz.getPreguntas().subscribe(
      (resp: any) => {
        console.log(resp);
        this.listPreguntas = JSON.parse(JSON.stringify(resp));
      }
    )
  }

}
