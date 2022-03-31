import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnswerPlayerService {
  path_base = environment.webService;

  constructor(private http: HttpClient) { }

  validateResolve(jugadorId: number, cuestionarioId: number){
    const URL = this.path_base + "respuestasjugador/" + cuestionarioId + "/" + jugadorId;
    return this.http.get<any>(URL);
  }

  createAnswers(data: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    const URL = this.path_base + "respuestasjugador";
    return this.http.post<any>(URL, data, httpOptions);
  }

  getFirstAnswer(quizzPlayerId: number){
    const URL = this.path_base + "respuestasjugador/" + quizzPlayerId;
    return this.http.get<any>(URL);
  }

  createComodin(data: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    const URL = this.path_base + "respuestasjugador/comodin";
    return this.http.post<any>(URL, data, httpOptions);
  }

  calificacionComodin(quizzPlayerId: number){
    const URL = this.path_base + "respuestascomodin/"+quizzPlayerId;
    return this.http.get<any>(URL);
  }
}
