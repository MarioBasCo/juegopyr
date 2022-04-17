import { AbstractControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthService } from './../../services/auth.service';
import { LstorageService } from './../../services/lstorage.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-confirm-recover',
  templateUrl: './confirm-recover.page.html',
  styleUrls: ['./confirm-recover.page.scss'],
})
export class ConfirmRecoverPage implements OnInit {
  loginForm: FormGroup;
  showPassword = false;
  passwordToggleIcon = 'eye-off-outline';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private serLogin: AuthService,
    private serStorage: LstorageService,
    private toast: ToastController
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      codigo: ['', Validators.required],
      clave: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon == 'eye-off-outline') {
      this.passwordToggleIcon = 'eye-outline';
    } else {
      this.passwordToggleIcon = 'eye-off-outline';
    }
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('clave').value !== c.get('confirm_password').value) {
      return { invalid: true };
    }
  }

  ingresar() {
    //console.log(this.loginForm);
    const data = {
      correo: this.loginForm.get('correo')?.value,
      codigo: this.loginForm.get('codigo')?.value,
      clave: this.loginForm.get('clave')?.value,
      tiempo_expiracion: new Date().toISOString()
    };
    console.log(data);
    this.serLogin.resetPassword(data).subscribe(
      resp => {
        if (resp.status == true) {
          /* this.serStorage.set('user', resp.user);
          this.serStorage.set('token', resp.token);
          //this.router.navigate(['/admin']); */
          this.showMessage(resp.message, 'success');
          this.router.navigateByUrl('/login', { replaceUrl: true });
        } else {
          this.showMessage(resp.message, 'danger');
        }
      }
    );
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
