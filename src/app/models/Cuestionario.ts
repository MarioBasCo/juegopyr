import { Pregunta } from "./Pregunta";

export class Cuestionario {
    cuestionarioId: number;
    titulo: string;
    descripcion: string;
    codigo: string;
    fecha_disp: Date;
    num_preguntas: number;
    preguntas: Pregunta[];

    constructor(cuestionarioId: number, titulo: string, descripcion: string, codigo: string,
        fecha_disp: Date, num_preguntas: number, preguntas: Pregunta[]) {
        this.cuestionarioId = cuestionarioId;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.codigo = codigo;
        this.num_preguntas = num_preguntas;
        this.fecha_disp = fecha_disp;
        this.preguntas = preguntas;
    }
}