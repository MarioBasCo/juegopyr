import { LstorageService } from './../../services/lstorage.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() titulo: string;

  constructor(private router: Router, private alertCtrl: AlertController, private serStorage: LstorageService) { }

  ngOnInit() {}

  irAPerfil(){
    this.router.navigateByUrl('/admin/profile');
  }

  async cerrarSesion(){
    const alert = await this.alertCtrl.create({
      header: 'Cerrar Sesión',
      message: 'Desea <strong>cerrar sesión</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirm Okay');
            this.serStorage.clear();
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();
  }
}
