import { LstorageService } from './../../services/lstorage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  showPassword = false;
  passwordToggleIcon = 'eye-off-outline';

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private serLogin : AuthService,
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

  ingresar(){
    //console.log(this.loginForm);
    const data = this.loginForm.value;
    console.log(data);
    this.serLogin.login(data).subscribe(
      resp => {
        if(resp.status == true){
          this.serStorage.set('user', resp.user);
          this.serStorage.set('token', resp.token);
          //this.router.navigate(['/admin']);
          this.router.navigateByUrl('/admin', { replaceUrl: true });
        } else {
          this.showMessage(resp.mensaje);
        }
      }
    );
  }

  togglePassword(){
    this.showPassword = !this.showPassword;
    if(this.passwordToggleIcon == 'eye-off-outline'){
      this.passwordToggleIcon = 'eye-outline';
    }else{
      this.passwordToggleIcon = 'eye-off-outline';
    }
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
