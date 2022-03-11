import { RespuestaComponent } from './../../modals/respuesta/respuesta.component';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async openModalRespuesta() {
    const modal = await this.modalCtrl.create({
      component: RespuestaComponent,
      cssClass: 'my-modal-class'
    });
    return await modal.present();
  }
}
