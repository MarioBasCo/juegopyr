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
    private toast: ToastController
    ) { 
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      clave: ['', Validators.required],
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
  }

  ingresar(){
    //console.log(this.loginForm);
    const data = this.loginForm.value;
    console.log(data);
  }

  async showMessage(message: string){
    const toast = await this.toast.create({
      message,
      color: 'danger',
      duration: 2000
    });
    toast.present();
  }
}
