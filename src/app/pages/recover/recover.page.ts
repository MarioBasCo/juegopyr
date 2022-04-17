import { AuthService } from './../../services/auth.service';
import { environment } from './../../../environments/environment';
import { ToastController } from '@ionic/angular';
import { LstorageService } from './../../services/lstorage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage implements OnInit {
  loginForm: FormGroup;
  isCaptchaValid: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private serStorage: LstorageService,
    private serUser: AuthService,
    private toast: ToastController
    ) { 
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      codigo: [false, [Validators.required, Validators.requiredTrue]],
    });
  }

  ngOnInit() {
  }

  get sitekey(){
    return environment.recaptcha.siteKey;
  }

  captchaResolved(event){
    console.log("Captcha resolved", event);
    this.isCaptchaValid = true;
    this.loginForm.get('codigo').setValue(true);
  }

  ingresar(){
    //console.log(this.loginForm);
    
    if(this.loginForm.valid){
      const data = this.loginForm.value;
      this.serUser.forgotPassword(data).subscribe(
        resp => {
          if(resp.status == false){
            this.showMessage(resp.message, 'danger');
          } else {
            this.showMessage(resp.message, 'success');
          }
        }
      );
    } else {
      return;
    }
  }

  async showMessage(message: string, color: string){
    const toast = await this.toast.create({
      message,
      color,
      duration: 3000
    });
    toast.present();
  }
}
