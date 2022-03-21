import { ToastController } from '@ionic/angular';
import { QuizzService } from './../../services/quizz.service';
import { LstorageService } from './../../services/lstorage.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  codigo: string = '';

  constructor(
    private router: Router, 
    private serStorage: LstorageService, 
    private serQuizz: QuizzService,
    private toast: ToastController) { }

  ngOnInit() {
  }

  ingresoJuego(){
    this.serQuizz.getCuestionarioByCodigo(this.codigo).subscribe(
      resp => {
        if(resp.status == false){
          this.showMessage(resp.message, 'danger');
        } else {
          this.serStorage.set('quizz', resp.data);
          this.router.navigate(['/start']);
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
