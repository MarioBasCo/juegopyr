import { AnswerPlayerService } from './../../services/answer-player.service';
import { ToastController } from '@ionic/angular';
import { PlayerService } from './../../services/player.service';
import { LstorageService } from './../../services/lstorage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  player_name: string = ''; 

  constructor(
    private router: Router, 
    private serStorage: LstorageService,
    private serAnswerPlayer: AnswerPlayerService,
    private serPlayer: PlayerService,
    private toast: ToastController) { }

  ngOnInit() {
  }

  ingresoJuego(){
    this.serPlayer.getEstudianteByUsuario(this.player_name.toLowerCase()).subscribe(
      resp => {
        if (resp.status == true) {
          this.serStorage.set('estudiante', resp.data);
          const { cuestionarioId } = this.serStorage.get('quizz');
          const { jugadorId } = this.serStorage.get('estudiante');
          this.serAnswerPlayer.validateResolve(jugadorId, cuestionarioId).subscribe(
            resp => {
              if(resp.status == false){
                this.router.navigate(['/game']);
              } else {
                this.serStorage.clear();
                this.router.navigate(['/home']);
                this.showMessage(resp.message, 'danger');
              }
            }
          );

        } else {
          this.showMessage(resp.message, 'danger');
        }
      }
    );
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
