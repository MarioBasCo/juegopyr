import { environment } from './../../../../../environments/environment.prod';
import { Pregunta, Cuestionario, Jugador } from './../../../../interfaces/interfaces';
import { ReportsService } from './../../../../services/reports.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  id: string | null;
  data: any | null;
  calificacion: number = 0;
  aciertos: number = 0;
  comodin: boolean = false;
  cuestionario: Cuestionario;
  estudiante: Jugador;
  preguntas: Pregunta[]=[];
  respuestasUser: any[]=[];
  correctas: any[]=[];
  url = environment.serverImages;
  
  constructor(private aRoute: ActivatedRoute, private serResult: ReportsService) { 
    this.id = this.aRoute.snapshot.paramMap.get('id');
    
  }

  ngOnInit() {
    if (this.id != null) {
      this.serResult.getResultadoById(parseInt(this.id)).subscribe(resp => {
        this.data = resp.data;
        this.cuestionario = this.data.cuestionario;
        this.calificacion = this.data.calificacion;
        this.comodin = this.data.comodin;
        this.preguntas = this.data.respuestas.map(d => d.pregunta);
        
        this.estudiante = this.data.jugador;
        this.respuestasUser = this.data.respuestas.map(d => d.respuestaId);
        let respuestas = this.data.respuestas.map(d => d.pregunta.respuestas);
        let respreg = [];
        respuestas.forEach(element => {
          element.forEach(el => {
            respreg.push(el);
          });
        });
        let contador = 0;
        respreg.forEach(d => {
          this.respuestasUser.forEach(e => {
            if(d.respuestaId == e && d.valor == true){
              contador++;
            }
          });
        });
        this.aciertos = contador;

        this.correctas = this.data.respuestas.map((obj) => {
          const rObj = {};
          rObj['preguntaId'] = obj.preguntaId;
          rObj['respuestaId'] = obj.respuestaId;
          rObj['esCorrecta'] = respreg.filter(e => e.valor == true && e.respuestaId == obj.respuestaId).length > 0 ? true : false;
          //respreg.filter(e => e.valor == true && e.respuestaId == obj.respuestaId);
          return rObj;
        });
      });
    }
  }
}
