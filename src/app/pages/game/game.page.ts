import { environment } from './../../../environments/environment.prod';
import { Router } from '@angular/router';
import { AnswerPlayerService } from './../../services/answer-player.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LstorageService } from './../../services/lstorage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  listpreguntas: any [] = [];
  indiceActual: number = 0;
  formPreg: FormGroup;
  respUser: any [] = [];
  valor: number = 0;
  txtbtn: string = 'SIGUIENTE';
  url = environment.serverImages;

  constructor( 
    private serStorage: LstorageService, 
    private serResp: AnswerPlayerService,
    private router: Router,
    private fb: FormBuilder) { 
      this.buildForm();
  }

  ngOnInit() {
    const  { preguntas } = this.serStorage.get('quizz');
    this.listpreguntas = preguntas;
    this.indiceActual = 0;
    this.formPreg.patchValue({
      preguntaId: preguntas[0].preguntaId,
      titulo: preguntas[0].titulo,
      img: preguntas[0].img,
    });
  }
  
  buildForm(){
    this.formPreg = this.fb.group({
      preguntaId: [''],
      titulo: [''],
      img: [''],
      respuestaId: ['', [Validators.required]]
    });
  }

  get preguntaIdField() {
    return this.formPreg.get('preguntaId');
  }

  get tituloField() {
    return this.formPreg.get('titulo');
  }
  
  get imgField() {
    return this.formPreg.get('img');
  }

  get respuestaIdField() {
    return this.formPreg.get('respuestaId');
  }

  setRespuetaId(event){
    this.valor = event.detail.value;
    //this.formPreg.get('respuestaId').patchValue(valor);
  }


  nextPregunta(preguntaId: number){
    //let copyList = this.listpreguntas.pop();
    const r = this.listpreguntas.find(element => element.preguntaId == preguntaId);
    let i = this.listpreguntas.indexOf(r);

    if(this.respUser.length < (this.listpreguntas.length-1)){
      this.respUser.push({
        preguntaId: this.preguntaIdField?.value,
        respuestaId: this.valor
      });
    } 
    console.log(this.respUser);

    if( (i+1) <= (this.listpreguntas.length-2)) {
      this.buildForm();
      this.formPreg.reset(this.formPreg.value);
      this.formPreg.patchValue({
        preguntaId: this.listpreguntas[i+1].preguntaId,
        titulo: this.listpreguntas[i+1].titulo,
        img: this.listpreguntas[i+1].img,
      });
      this.indiceActual = i+1;
      if(this.indiceActual == (this.listpreguntas.length-2)){
        this.txtbtn = 'FINALZAR';
      }
    } 

    if(this.respUser.length == (this.listpreguntas.length-1)){
      const { cuestionarioId } = this.serStorage.get('quizz');
      const { jugadorId } = this.serStorage.get('estudiante');
      const data = {
        jugadorId: jugadorId,
        cuestionarioId: cuestionarioId,
        respuestasJugador: this.respUser
      }
      console.log(data);
      this.serResp.createAnswers(data).subscribe(resp => {
        if(resp.status == true){
          let quizzPlayerId = resp.data.quizzPlayerId;
          this.serStorage.set('quizzPlayerId', quizzPlayerId);
          this.serResp.getFirstAnswer(quizzPlayerId).subscribe(data => {
            if(data.preguntas == data.aciertos){
              this.router.navigate(['/congratulations']);
              this.serStorage.set('calf', data);
            } else {
              this.serStorage.set('calf', data);
              this.router.navigate(['/comodin']);
            }
          });
        }
        console.log(resp);
      });
    }
  }

}
