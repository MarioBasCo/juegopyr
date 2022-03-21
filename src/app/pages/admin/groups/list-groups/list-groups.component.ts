import { AlertController, ToastController } from '@ionic/angular';
import { Subject, Subscription } from 'rxjs';
import { LstorageService } from './../../../../services/lstorage.service';
import { GroupService } from './../../../../services/group.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-list-groups',
  templateUrl: './list-groups.component.html',
  styleUrls: ['./list-groups.component.scss'],
})
export class ListGroupsComponent implements OnInit, OnDestroy {
  grupos: any[]=[];
  subscription: Subscription;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  constructor(
    private serGrupos: GroupService, 
    private serStorage: LstorageService, 
    private toast: ToastController,
    private alertCtrl: AlertController) { }

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
    this.grupos = [];
    const { userId } = this.serStorage.get('user');

    this.subscription = this.serGrupos.getGrupos(userId).subscribe(
      resp => {
        this.serGrupos.groups = resp;
        this.grupos = this.serGrupos.groups;
        this.dtTrigger.next();
      }
    );
  }

  identify(index, item) {
    return item.grupoId;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.dtTrigger.unsubscribe();
  }

  async confirmBox(item: any){
    const alert = await this.alertCtrl.create({
      header: '!Advertencia¡',
      cssClass: 'app-alert',
      message: `<ion-icon name="alert-circle-outline"></ion-icon><br> ¿Desea <strong>eliminar</strong> el grupo ${item.nombre_grupo}?`,
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
            this.serGrupos.deleteGroup(item.grupoId).subscribe(resp => {
              if(resp.status == true) {
                this.serGrupos.eliminarGrupo(item);
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

  async showMessage(message: string, color: string) {
    const toast = await this.toast.create({
      message,
      color,
      duration: 3000
    });
    toast.present();
  }

}
