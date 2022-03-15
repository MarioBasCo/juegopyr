import { Pregunta } from './../../../../models/Pregunta';
import { Cuestionario } from './../../../../models/Cuestionario';
import { QuizzService } from './../../../../services/quizz.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-quizz',
  templateUrl: './view-quizz.component.html',
  styleUrls: ['./view-quizz.component.scss'],
})
export class ViewQuizzComponent implements OnInit {
  id: string | null;
  data: any | null;
  titulo: string; 
  descripcion: string; 
  codigo: string;
  fecha_disp: Date;
  num_preguntas: number;
  preguntas: any[]=[];
  url = 'http://localhost:4000/images/';
  
  constructor(private aRoute: ActivatedRoute, private serQuizz: QuizzService) { 
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    if (this.id != null) {
      this.serQuizz.getCuestionario(parseInt(this.id)).subscribe(
        resp => {
          const { cuestionarioId, titulo, descripcion, 
            codigo, fecha_disp, num_preguntas, preguntas} = resp;
          this.titulo = titulo;
          this.descripcion = descripcion;
          this.codigo = codigo;
          this.fecha_disp = fecha_disp;
          this.num_preguntas = num_preguntas;
          this.preguntas = preguntas;
        }
      );
    }
  }

}
