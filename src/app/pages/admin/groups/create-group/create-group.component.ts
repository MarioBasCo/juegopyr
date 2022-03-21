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
export class CreateGroupComponent implements OnInit {
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


  guardar() {
    const { userId } = this.serStorage.get('user');
    const data = {
      userId: userId,
      nombre_grupo: this.descripcionField.value
    }
    this.changeFormValueChange();
    console.log(this.hasChange);

    if (this.id != null) {
      this.serGroup.editGroup(parseInt(this.id), data).subscribe(
        resp => {
          console.log(resp);
          if (resp.status == true) {
            let i = this.serGroup.groups.findIndex(d => d.grupoId == this.id);
            this.serGroup.groups[i].nombre_grupo = this.descripcionField.value;
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
            const { data } = resp;
            data.estudiantes = 0;
            this.serGroup.groups.push(data);
            this.router.navigateByUrl('/admin/groups');
            this.showMessage(resp.message, 'success');
          }
        }
      );
    } 
  }

  resetForm() {
    this.buildForm();
    this.grupoForm.reset(this.grupoForm.value);
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
