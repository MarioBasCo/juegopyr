import { OnExit } from './../../../../guards/exit.guard';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { GroupService } from './../../../../services/group.service';
import { LstorageService } from './../../../../services/lstorage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss'],
})
export class CreateGroupComponent implements OnInit, OnExit {
  id: string | null;
  grupoForm: FormGroup;
  hasChange: boolean = false;

  constructor(
    private fb: FormBuilder,
    private serStorage: LstorageService,
    private serGroup: GroupService,
    private toast: ToastController,
    private alertCtrl: AlertController,
    private router: Router,
    private aRoute: ActivatedRoute) {
    this.id = this.aRoute.snapshot.paramMap.get('id');
    this.buildForm();
    //this.changeFormValueChange();
    //console.log(this.hasChange);
  }

  ngOnInit() {
    this.esEditar();
  }

  get descripcionField() {
    return this.grupoForm.get('descripcion');
  }

  changeFormValueChange() {
    const initialValue = this.grupoForm.value
    this.grupoForm.valueChanges.subscribe(value => {
      this.hasChange = Object.keys(initialValue).some(key => value[key] !=
        initialValue[key]);
    });
  }

  esEditar() {
    if (this.id != null) {
      this.serGroup.getOne(parseInt(this.id)).subscribe(
        resp => {
          if (resp.status == true) {
            this.grupoForm.patchValue(
              {
                descripcion: resp.data.nombre_grupo,
              }
            );
          }
        }
      );
    }
  }

  buildForm() {
    this.grupoForm = this.fb.group({
      descripcion: ['', Validators.required],
    });
  }

  cancelar() {
    this.router.navigateByUrl('/admin/groups');
  }

  async onExit() {
    if (this.grupoForm.dirty) {
      return this.showAlert();
    } else {
      return true;
    }
  }

  guardar() {
    const { userId } = this.serStorage.get('user');
    const data = {
      userId: userId,
      nombre_grupo: this.descripcionField.value
    }
    this.changeFormValueChange();
    console.log(this.hasChange);

    /* if (this.id != null) {
      this.serGroup.editGroup(parseInt(this.id), data).subscribe(
        resp => {
          console.log(resp);
          if (resp.status == true) {
            this.resetForm();
            this.router.navigateByUrl('/admin/groups');
            this.showMessage(resp.message, 'success');
          }
        }
      );
    } else {
      this.serGroup.createGroup(data).subscribe(
        resp => {
          console.log(resp);
          if (resp.status == true) {
            this.resetForm();
            //this.serGroup.addGrupo(resp.data);
            this.router.navigateByUrl('/admin/groups');
            this.showMessage(resp.message, 'success');
          }
        }
      );
    } */
  }


  resetForm() {
    this.buildForm();
    this.grupoForm.reset(this.grupoForm.value);
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
    if (role) {
      return role == 'cancel' ? false : true;
    }
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
