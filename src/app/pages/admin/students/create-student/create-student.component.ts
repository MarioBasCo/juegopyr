import { PlayerService } from './../../../../services/player.service';
import { LstorageService } from './../../../../services/lstorage.service';
import { GroupService } from './../../../../services/group.service';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss'],
})
export class CreateStudentComponent implements OnInit {
  id: string | null;
  studentForm: FormGroup;
  grupos: any[] = [];

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private aRoute: ActivatedRoute,
    private serStorage: LstorageService,
    private serPlayer: PlayerService,
    private toast: ToastController,
    private serGroup: GroupService) { 
      this.id = this.aRoute.snapshot.paramMap.get('id');
    this.buildForm();
  }

  ngOnInit() {
    this.esEditar();
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
  
  esEditar(){
    if (this.id != null) {
      this.serPlayer.$getObjectSource.subscribe(
        (resp: any) => {
          const {nombre, apellido, grupo, player_name } = resp;
          this.studentForm.patchValue(
            {
              nombre,
              apellido,
              grupoId: grupo.grupoId,
              player_name,
            }
          );
        }
      );
    }
  }

  cancelar() {
    this.router.navigate(['admin/students']);
  }

  guardar() {
    const data = this.studentForm.value;
    if (this.id != null) {

    } else {
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
  }

  resetForm(){
    this.buildForm();
    this.studentForm.reset(this.studentForm.value);
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
