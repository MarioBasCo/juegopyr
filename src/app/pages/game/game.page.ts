import { QuizzService } from './../../services/quizz.service';
import { LstorageService } from './../../services/lstorage.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  constructor(private modalCtrl: ModalController, private serStorage: LstorageService, private serQuizz: QuizzService) { }
  preguntas: any [] = [];
  pregunta: any;
  indiceActual: number = 0;

  player_name: string = '';
  respUser: any [] = [];
  url = 'http://localhost:4000/images/';

  ngOnInit() {
    this.cargarDatos();
    this.pregunta = this.serStorage.get('preg')[0];
    this.indiceActual = 0;
  }

  cargarDatos() {
    this.player_name = this.serStorage.get('player_name');
    const codigo = this.serStorage.get('codigo');
    this.serQuizz.getCuestionarioByCodigo(codigo).subscribe(
      resp => {
        this.preguntas = resp.preguntas;
        this.serStorage.set('preg', this.preguntas);
      }
    );
  }

  async openModalRespuesta() {
    /* const modal = await this.modalCtrl.create({
      component: ,
      cssClass: 'my-modal-class'
    });
    return await modal.present(); */
  }

  nextPregunta(preguntaId: number){
    const r = this.preguntas.find(element => element.preguntaId == preguntaId);
    let i = this.preguntas.indexOf(r);
    if( (i+1) == this.preguntas.length) {
      return;
    } else {
      this.pregunta = this.preguntas[i+1];
      this.indiceActual = i;
      console.log(i, this.pregunta);
    }
  }
}
