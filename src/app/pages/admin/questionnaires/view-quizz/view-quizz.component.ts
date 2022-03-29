import { environment } from './../../../../../environments/environment.prod';
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
  url = environment.serverImages;
  
  constructor(private aRoute: ActivatedRoute, private serQuizz: QuizzService) { 
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    if (this.id != null) {
      this.serQuizz.getCuestionario(parseInt(this.id)).subscribe(
        resp => {
          /* const { titulo, descripcion, 
            codigo, fecha_disp, num_preguntas, preguntas} = resp; */
          this.titulo = resp.titulo;
          this.descripcion = resp.descripcion;
          this.codigo = resp.codigo;
          this.fecha_disp = resp.fecha_disp;
          this.num_preguntas = resp.num_preguntas;
          this.preguntas = resp.preguntas;
        }
      );
    }
  }

}
