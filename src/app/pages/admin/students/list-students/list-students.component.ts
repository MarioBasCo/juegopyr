import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { AlertController, ToastController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { LstorageService } from './../../../../services/lstorage.service';
import { PlayerService } from './../../../../services/player.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.scss'],
})
export class ListStudentsComponent implements OnInit, OnDestroy {
  estudiantes: any[]=[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  constructor(
    private serPlayer: PlayerService, 
    private serStorage: LstorageService,
    private router: Router,
    private alertCtrl: AlertController,
    private toast: ToastController) { }

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

  cargarDatos() {
    const { userId } = this.serStorage.get('user');
    this.serPlayer.getEstudiantes(userId).subscribe(
      resp => {
        this.estudiantes = resp;
        this.dtTrigger.next();
      }
    );
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  async confirmBox(item: any){
    const alert = await this.alertCtrl.create({
      header: '!Advertencia¡',
      cssClass: 'app-alert',
      message: `<ion-icon name="alert-circle-outline"></ion-icon><br> 
      ¿Desea <strong>eliminar</strong> a ${item.nombre} ${item.apellido}?`,
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
            this.serPlayer.deletePlayer(item.jugadorId).subscribe(resp => {
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

  edit(item){
    this.serPlayer.enviarObject(item);
    this.router.navigateByUrl(`admin/students/edit-student/${item.jugadorId}`);
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
