import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { LstorageService } from './../../../../services/lstorage.service';
import { QuizzService } from './../../../../services/quizz.service';

import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-list-questionnaires',
  templateUrl: './list-questionnaires.component.html',
  styleUrls: ['./list-questionnaires.component.scss'],
})
export class ListQuestionnairesComponent implements OnInit {
  cuestionarios: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  constructor(
    private serQuizz: QuizzService, 
    private serStorage: LstorageService,
    private router: Router,
    private alertCtrl: AlertController,
    private toast: ToastController) {
  }

  ngOnInit() { 
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 5,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json'
      }
    };
    this.cargarDatos();
  }

  cargarDatos(){
    const { userId } = this.serStorage.get('user');
    this.serQuizz.getCuestionarios(userId).subscribe(
      resp => {
        this.cuestionarios = resp;
        console.log(resp);
        this.dtTrigger.next();
      }
    );
  }


  async confirmBox(item: any){
    const alert = await this.alertCtrl.create({
      header: '!Advertencia¡',
      cssClass: 'app-alert',
      message: `<ion-icon name="alert-circle-outline"></ion-icon><br> ¿Desea <strong>eliminar</strong> el cuestionario ${item.titulo}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        }, {
          text: 'Confirmar',
          role: 'exit',
          handler: () => {
            this.serQuizz.deleteQuizz(item.cuestionarioId).subscribe(resp => {
              if(resp.status == true) {
                this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                  dtInstance.destroy();
                  this.cargarDatos();
                });
                
                this.showMessage(resp.message, 'success');
              }
            });
          }
        }
      ]
    });

    alert.present();
  }

  edit(item) {
    this.router.navigateByUrl(`admin/questionnaires/quizz/${item.cuestionarioId}`);
  }

  async showMessage(message: string, color: string) {
    const toast = await this.toast.create({
      message,
      color,
      duration: 3000
    });
    toast.present();
  }

  recargarDatos(){
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.cargarDatos();
    });
  }
}
