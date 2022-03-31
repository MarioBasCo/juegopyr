import { ToastController } from '@ionic/angular';
import { environment } from './../../../environments/environment.prod';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnswerPlayerService } from './../../services/answer-player.service';
import { LstorageService } from './../../services/lstorage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comodin-question',
  templateUrl: './comodin-question.page.html',
  styleUrls: ['./comodin-question.page.scss'],
})
export class ComodinQuestionPage implements OnInit {
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
    private fb: FormBuilder,
    private toast: ToastController) { 
      this.buildForm();
  }

  ngOnInit() {
    const  { preguntas } = this.serStorage.get('quizz');
    this.listpreguntas = preguntas;
    this.indiceActual = this.listpreguntas.length - 1;
    this.formPreg.patchValue({
      preguntaId: preguntas[this.indiceActual].preguntaId,
      titulo: preguntas[this.indiceActual].titulo,
      img: preguntas[this.indiceActual].img,
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
    const quizzPlayerId = this.serStorage.get('quizzPlayerId');
    
    const data = {
      quizzPlayerId,
      preguntaId: this.preguntaIdField?.value,
      respuestaId: this.valor
    }

    this.serResp.createComodin(data).subscribe(resp => {
      if(resp.status == true){
        let quizzPlayerId = resp.data.quizzPlayerId;
        //this.showMessage('Información guardada con éxito', 'success');
        this.serStorage.set('quizzPlayerId', quizzPlayerId);
        this.serResp.calificacionComodin(quizzPlayerId).subscribe(data => {
          console.log(data);
          this.serStorage.set('calf', data);
          this.router.navigate(['/comodin-result']);
        });
      }
    });
  }

  async showMessage(message: string, color: string) {
    const toast = await this.toast.create({
      message,
      color,
      duration: 3000
    });
    toast.present();
  }
}
