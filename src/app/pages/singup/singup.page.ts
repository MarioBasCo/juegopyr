import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from './../../services/auth.service';
import { YearValidation } from './../../utils/yearValidation';
import { AgeValidation } from './../../utils/ageValidation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.page.html',
  styleUrls: ['./singup.page.scss'],
})
export class SingupPage implements OnInit {
  dateValue: string = "";
  regForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private serAuth: AuthService, 
    private toast: ToastController,
    private router: Router) { 
    this.buildForm();
  }

  ngOnInit() {
  }

  buildForm(){
    let hoy = new Date();
    hoy.setFullYear(hoy.getFullYear()-18);
    this.dateValue = hoy.toISOString().slice(0, 10).replace('T', ' ');
    this.regForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150), Validators.pattern("[A-Za-zÁÉÍÓÚáéíóúñÑ ]+")]],
      apellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150), Validators.pattern("[A-Za-zÁÉÍÓÚáéíóúñÑ ]+")]],
      fechanaci: [this.dateValue, [Validators.required, AgeValidation.isOlder, YearValidation.isValidYear]],
      correo: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      clave: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  guardar(){
    console.log(this.regForm.value);
    const data = this.regForm.value;
    this.serAuth.singup(data).subscribe(
      resp => {
        if(resp.status == true){
          this.resetForm();
          this.showMessage('Usuario Registrado con exito, inicie sesión con sus credenciales', 'success');
          this.router.navigateByUrl('/login', { replaceUrl: true });
        } else {
          this.showMessage(resp.message, 'danger');
        }
      }
    );
  }

  resetForm(){
    this.buildForm();
    this.regForm.reset(this.regForm.value);
  }

  async showMessage(message: string, color: string){
    const toast = await this.toast.create({
      message,
      color,
      duration: 2000
    });
    toast.present();
  }
}
