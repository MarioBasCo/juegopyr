import { DatePipe } from '@angular/common';
import { ToastController } from '@ionic/angular';
import { LstorageService } from './../../../../services/lstorage.service';
import { QuizzService } from './../../../../services/quizz.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-create-quizz',
  templateUrl: './create-quizz.component.html',
  styleUrls: ['./create-quizz.component.scss'],
})
export class CreateQuizzComponent implements OnInit {
  id: string | null;
  cuestionarioForm: FormGroup;
  editMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private serQuizz: QuizzService,
    private serStorage: LstorageService,
    private toast: ToastController,
    private router: Router,
    private datePipe: DatePipe,
    private aRoute: ActivatedRoute) {
    this.buildForm();
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  buildForm(){
    const fecha = new Date(new Date().toLocaleString('en-US', {
      timeZone: 'America/Guayaquil',
    }));
    
    fecha.setDate(fecha.getDate()+3);
    let fstr = this.datePipe.transform(fecha, 'yyyy-MM-dd');
    
    this.cuestionarioForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha_disp: [fstr, Validators.required]
    });
  }

  get tituloField() {
    return this.cuestionarioForm.get('titulo');
  }

  get descripcionField() {
    return this.cuestionarioForm.get('descripcion');
  }

  get fechaDispField() {
    return this.cuestionarioForm.get('fecha_disp');
  }

  esEditar(){
    if (this.id != null) {
      this.editMessage = 'Solo Puede actualizar los datos del cuestionario más no su contenido';
      this.serQuizz.getCuestionario(parseInt(this.id)).subscribe(
        (resp: any) => {
          const {titulo, descripcion, fecha_disp } = resp;
          let fstr = this.datePipe.transform(fecha_disp, 'yyyy-MM-dd');
          this.cuestionarioForm.patchValue(
            {
              titulo,
              descripcion,
              fecha_disp: fstr,
            }
          );
        }
      );
    }
  }

  cancelar(){
    this.router.navigate(['/admin/questionnaires']);
  }

  cambiarFecha(){
    console.log(this.formatearFecha(this.fechaDispField?.value));
  }

  siguiente() {
    if (this.id != null) {
      console.log(new Date(this.fechaDispField?.value));
      const data = {
        titulo: this.tituloField?.value,
        descripcion: this.descripcionField?.value,
        fecha_disp: this.formatearFecha(this.fechaDispField?.value),
        estado: 'A',
        accion: 'update'
      }
      this.serQuizz.actualizarEstado(parseInt(this.id), data).subscribe(
        resp => {
          if(resp.status == true){
            this.showMessage('Cuestinario Actualizado', 'success');
            this.router.navigate(['/admin/questionnaires']);
            //this.router.navigate(['/admin/questionnaires/questions']);
          }
        }
      );
    } else {
      if (!this.cuestionarioForm.invalid) {
        const { userId } = this.serStorage.get('user');
        const data = {
          userId,
          titulo: this.tituloField?.value,
          fecha_disp: this.formatearFecha(this.fechaDispField?.value),
          descripcion: this.descripcionField?.value
        }
      
        //console.log(data)
        this.serQuizz.crearCuestionario(data).subscribe(
          resp => {
            this.serQuizz.enviarObject(resp);
          }
        );
  
        this.router.navigate(['/admin/questionnaires/questions']);
      } 
    }
  }

  formatearFecha(fdisp){
    let arr = fdisp.split("-");
    
    let fecha_disp = new Date(new Date().toLocaleString('en-US', {
      timeZone: 'America/Guayaquil',
    }));
    fecha_disp.setFullYear(arr[0]);
    fecha_disp.setMonth(arr[1]-1);
    fecha_disp.setDate(arr[2]);
    fecha_disp.setHours(0);
    fecha_disp.setMinutes(0);
    fecha_disp.setSeconds(0);
    
    console.log(this.datePipe.transform(fecha_disp, 'yyyy-MM-dd HH:mm:ss'))
    return this.datePipe.transform(fecha_disp, 'yyyy-MM-dd HH:mm:ss');
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
