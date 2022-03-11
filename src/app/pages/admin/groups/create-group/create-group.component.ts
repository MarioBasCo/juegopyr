import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
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

  constructor(
    private fb: FormBuilder,
    private serStorage: LstorageService,
    private serGroup: GroupService,
    private toast: ToastController,
    private router: Router,
    private aRoute: ActivatedRoute) {
    this.id = this.aRoute.snapshot.paramMap.get('id');
    this.buildForm();
  }

  ngOnInit() {
    this.esEditar();
  }

  get descripcionField() {
    return this.grupoForm.get('descripcion');
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

    if (this.id != null) {
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
      duration: 2000
    });
    toast.present();
  }
}
