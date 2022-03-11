import { LstorageService } from './../../../../services/lstorage.service';
import { QuizzService } from './../../../../services/quizz.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-create-quizz',
  templateUrl: './create-quizz.component.html',
  styleUrls: ['./create-quizz.component.scss'],
})
export class CreateQuizzComponent implements OnInit {
  cuestionarioForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private serQuizz: QuizzService,
    private serStorage: LstorageService,
    private router: Router) {
      let hoy = new Date();
      hoy.setDate(hoy.getDate()+3);
      let fstr = moment(hoy).format('MM/DD/YYYY');
      let hola = new Date(fstr).toISOString().slice(0, 10).replace('T', ' ');
      this.cuestionarioForm = this.fb.group({
        titulo: ['', Validators.required],
        descripcion: ['', Validators.required],
        fecha_disp: [hola, Validators.required]
      });
  }

  ngOnInit(): void {
  
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

  cancelar(){
    this.router.navigate(['/admin/questionnaires']);
  }

  siguiente() {
    if (!this.cuestionarioForm.invalid) {
      const { userId } = this.serStorage.get('user');
      const data = {
        userId,
        titulo: this.tituloField?.value,
        fecha_disp: this.fechaDispField?.value,
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
