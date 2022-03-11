import { PlayerService } from './../../../../services/player.service';
import { LstorageService } from './../../../../services/lstorage.service';
import { GroupService } from './../../../../services/group.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { OnExit } from 'src/app/guards/exit.guard';


@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss'],
})
export class CreateStudentComponent implements OnInit, OnExit {
  studentForm: FormGroup;
  grupos: any[] = [];

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private alertCtrl: AlertController,
    private serStorage: LstorageService,
    private serPlayer: PlayerService,
    private toast: ToastController,
    private serGroup: GroupService) { 
    this.buildForm();
  }

  async onExit() {
    if (this.studentForm.dirty) {
      return this.showAlert();
    } else {
      return true;
    } 
  }

  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: '!Advertencia¡',
      message: `¿Esta seguro de <strong>salir sin guardar</strong> los datos?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            //return false;
          }
        }, {
          text: 'Confirmar',
          role: 'exit',
          handler: () => {
            //this.router.navigate(['admin/students']);
            //return true;
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    if(role){
      return role == 'cancel' ? false : true; 
    } 
  }

  ngOnInit() {
    const { userId } = this.serStorage.get('user');
    this.serGroup.getGrupos(userId).subscribe(
      resp => {
        console.log(resp);
        this.grupos = resp;
      }
    )
  }

  buildForm() {
    this.studentForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      grupoId: ['', Validators.required],
      player_name: ['', Validators.required],
    });
  }

  get nombreField() {
    return this.studentForm.get('nombre');
  }

  get apellidoField() {
    return this.studentForm.get('apellido');
  }
  
  get grupoIdField() {
    return this.studentForm.get('grupoId');
  }

  get player_nameField() {
    return this.studentForm.get('player_name');
  }

  cancelar() {
    this.router.navigate(['admin/students']);
  }

  guardar() {
    const data = this.studentForm.value;
    this.serPlayer.createEstudiante(data).subscribe(
      resp => {
        if(resp.status == true){
          this.showMessage(resp.message, 'success');
          this.resetForm();
          this.router.navigate(['admin/students']);
        }
      }
    );
  }

  resetForm(){
    this.buildForm();
    this.studentForm.reset(this.studentForm.value);
  }

  async showMessage(message: string, color: string) {
    const toast = await this.toast.create({
      message,
      color,
      duration: 2000
    });
    toast.present();
  }

}
