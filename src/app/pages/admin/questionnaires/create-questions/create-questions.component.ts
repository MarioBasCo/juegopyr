import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { QuizzService } from './../../../../services/quizz.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { requiredFileType } from 'src/app/utils/fileType';
import { nanoid } from 'nanoid';

@Component({
  selector: 'app-create-questions',
  templateUrl: './create-questions.component.html',
  styleUrls: ['./create-questions.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateQuestionsComponent implements OnInit {
  agregarPregunta: FormGroup;
  listPreguntas: any [] = [];
  @ViewChild('myInput') myInputVariable: ElementRef;
  mostrarError = false;
  puntosInit: number;
  cuestionarioId: number = 0;
  fecha_disp: any;
  titulo: string = '';
  descripcion: string = '';
  url = 'http://localhost:4000/images/';

  constructor(private serQuizz: QuizzService, private fb: FormBuilder, private router: Router, private toast: ToastController) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.obtenerDatosIniciales();
    /* if(!this.cuestionarioId){
      this.router.navigateByUrl('admin/questionnaires');
    } */
  }

  obtenerDatosIniciales() {
    this.serQuizz.$getObjectSource.subscribe(
      (resp: any) => {
        const { cuestionarioId, titulo, descripcion, fecha_disp } = resp;
        this.cuestionarioId = cuestionarioId;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fecha_disp = fecha_disp;
      }
    );
  }

  buildForm() {
    this.agregarPregunta = this.fb.group({
      pregunta: ['', Validators.required],
      imagen: ['', requiredFileType(["jpg", "png"])],
      respuesta1: this.fb.group({
        titulo: ['', Validators.required],
        esCorrecta: [false, Validators.required]
      }),
      respuesta2: this.fb.group({
        titulo: ['', Validators.required],
        esCorrecta: [false, Validators.required]
      }),
      respuesta3: this.fb.group({
        titulo: '',
        esCorrecta: false
      }),
      respuesta4: this.fb.group({
        titulo: '',
        esCorrecta: false
      }),
    });
  }

  get pregunta() { return this.agregarPregunta.get('pregunta') }
  get imagen() { return this.agregarPregunta.get('imagen') }
  get res1Titulo() { return this.agregarPregunta.get('respuesta1.titulo') }
  get res2Titulo() { return this.agregarPregunta.get('respuesta2.titulo') }

  agregarPreg() {
    if (this.agregarPregunta.invalid || this.todasIncorrectas()) {
      this.error();
      return;
    }

    let listRespuestas: any[] = [];

    // Obtenemos respuesta 1
    const rtaTitulo1 = this.agregarPregunta.get('respuesta1')?.get('titulo')?.value;
    const esCorrecta1 = this.agregarPregunta.get('respuesta1')?.get('esCorrecta')?.value;

    const respuesta1: any = {
      descripcion: rtaTitulo1,
      valor: esCorrecta1
    }

    listRespuestas.push(respuesta1);

    // Obtenemos respuesta 2
    const rtaTitulo2 = this.agregarPregunta.get('respuesta2')?.get('titulo')?.value;
    const esCorrecta2 = this.agregarPregunta.get('respuesta2')?.get('esCorrecta')?.value;

    const respuesta2: any = {
      descripcion: rtaTitulo2,
      valor: esCorrecta2
    }

    listRespuestas.push(respuesta2);

    // Obtenemos respuesta 3
    const rtaTitulo3 = this.agregarPregunta.get('respuesta3')?.get('titulo')?.value;
    const esCorrecta3 = this.agregarPregunta.get('respuesta3')?.get('esCorrecta')?.value;

    const respuesta3: any = {
      descripcion: rtaTitulo3,
      valor: esCorrecta3
    }

    if (rtaTitulo3 != '' && rtaTitulo3 != null) {
      console.log(rtaTitulo3);
      listRespuestas.push(respuesta3);
    }

    // Obtenemos respuesta 4
    const rtaTitulo4 = this.agregarPregunta.get('respuesta4')?.get('titulo')?.value;
    const esCorrecta4 = this.agregarPregunta.get('respuesta4')?.get('esCorrecta')?.value;

    const respuesta4: any = {
      descripcion: rtaTitulo4,
      valor: esCorrecta4
    }

    if (rtaTitulo4 != '' && rtaTitulo4 != null) {
      listRespuestas.push(respuesta4);
    }

    // Creamos pregunta
    const tituloPregunta = this.pregunta?.value;
    const imagen = this.imagen?.value;

    const pregunta: any = {
      cuestionarioId: this.cuestionarioId,
      titulo: tituloPregunta,
      img: imagen,
      respuestas: listRespuestas
    }

    this.serQuizz.crearPreguntas(pregunta).subscribe(
      resp => {
        console.log(resp)
        this.reset();
        this.myInputVariable.nativeElement.value = "";
        this.cargarPreguntas();
      }
    ); 
  }

  imageUpload(event){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.imagen?.setValue(file);
    }
  }

  reset() {
    this.buildForm();
    this.agregarPregunta.reset(this.agregarPregunta.value);
  }

  todasIncorrectas() {
    const array = ['respuesta1', 'respuesta2', 'respuesta3', 'respuesta4']
    for (let i = 0; i < array.length; i++) {
      if (this.agregarPregunta.get(array[i])?.get('esCorrecta')?.value == true) {
        return false;
      }
    }
    return true;
  }

  error() {
    this.mostrarError = true;
    // Mostramos por tres segundos el error
    setTimeout(() => {
      this.mostrarError = false
    }, 4500);
  }

  esCorrecta(index: string) {
    let stringRta = 'respuesta';
    let nroRespuesta = stringRta.concat(index);
    this.setFalseRespuestas(nroRespuesta);
    const estadoRta = this.obtenerEstadoRespuesta(nroRespuesta);

    this.agregarPregunta.get(nroRespuesta)?.patchValue({
      esCorrecta: !estadoRta
    });
  }

  obtenerEstadoRespuesta(nroRespuesta: string): boolean {
    return this.agregarPregunta.get(nroRespuesta)?.get('esCorrecta')?.value;
  }

  setFalseRespuestas(nroRespuestas: string) {
    const array = ['respuesta1', 'respuesta2', 'respuesta3', 'respuesta4'];
    // Recorremos el array y seteamos TODAS las respuestas como false MENOS la que el usuario selecciono
    for (let i = 0; i < array.length; i++) {
      if (array[i] !== nroRespuestas) {
        this.agregarPregunta.get(array[i])?.patchValue({
          esCorrecta: false
        });
      }
    }
  }

  cargarPreguntas() {
    this.serQuizz.getPregResp(this.cuestionarioId).subscribe(
      resp => {
        this.listPreguntas = resp;
      }
    );
  }
  

  finalizar(){
    const data = {
      codigo: this.generarCodigo(),
      num_preguntas: this.listPreguntas.length,
      estado: 'A',
      accion: 'complete'
    }
    this.serQuizz.actualizarEstado(this.cuestionarioId, data).subscribe(
      resp => {
        if(resp.status == true){
          this.showMessage('Cuestinario Creado', 'success');
          this.router.navigateByUrl('/admin/questionnaires');
        }
      }
    );
  }

  generarCodigo(): string{
    return nanoid(6).toUpperCase();
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
