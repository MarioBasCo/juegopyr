import { Respuesta } from "./Respuesta";

export class Pregunta {
    titulo: string;
    img?: string;
    respuestas: Respuesta[];

    constructor(titulo: string, img: string, respuestas: Respuesta[]){
        this.titulo = titulo;
        this.img = img;
        this.respuestas = respuestas;
    }
}