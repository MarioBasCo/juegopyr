import { ComodinComponent } from './../../modals/comodin/comodin.component';
import { CongratulationsComponent } from './../../modals/congratulations/congratulations.component';
import { AnswerPlayerService } from './../../services/answer-player.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LstorageService } from './../../services/lstorage.service';
import { ModalController } from '@ionic/angular';
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
  player_name: string = '';
  respUser: any [] = [];
  valor: number = 0;
  txtbtn: string = 'SIGUIENTE';
  url = 'http://localhost:4000/images/';

  constructor(
    private modalCtrl: ModalController, 
    private serStorage: LstorageService, 
    private serResp: AnswerPlayerService,
    private fb: FormBuilder) { 
      this.buildForm();
  }

  ngOnInit() {
    const  { preguntas } = this.serStorage.get('quizz');
    const { player_name } = this.serStorage.get('estudiante');
    this.player_name = player_name
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

  async openModalRespuesta() {
    /* const modal = await this.modalCtrl.create({
      component: ,
      cssClass: 'my-modal-class'
    });
    return await modal.present(); */
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
          this.serResp.getFirstAnswer(quizzPlayerId).subscribe(data => {
            if(data.preguntas == data.aciertos){
              //this.serStorage.clear();
              this.openModalDetail();
            } else {
              this.openModalComodin();
            }
          });
        }
        console.log(resp);
      });
    }
  }

  async openModalDetail(){
    const modal = await this.modalCtrl.create({
      component: CongratulationsComponent,
      backdropDismiss: true,
      showBackdrop: true
    });

    await modal.present();
  }

  async openModalComodin(){
    const modal = await this.modalCtrl.create({
      component: ComodinComponent,
      backdropDismiss: true,
      showBackdrop: true
    });

    await modal.present();
  }
}
