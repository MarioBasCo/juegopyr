export interface Datum {
  quizzPlayerId: number;
  jugadorId: number;
  cuestionarioId: number;
  calificacion: number;
  comodin: boolean;
  porcentaje: number;
  jugador: Jugador;
  cuestionario: Cuestionario;
  respuestas: RespuestasUsuario[];
}

export interface RespuestasUsuario {
  resPlayerId: number;
  quizzPlayerId: number;
  preguntaId: number;
  respuestaId: number;
  pregunta: Pregunta;
}

export interface Pregunta {
  preguntaId: number;
  cuestionarioId: number;
  titulo: string;
  img: string;
  respuestas: Respuesta[];
}

export interface Respuesta {
  respuestaId: number;
  preguntaId: number;
  descripcion: string;
  valor: boolean;
}

export interface Cuestionario {
  cuestionarioId: number;
  userId: number;
  titulo: string;
  descripcion: string;
  codigo: string;
  fecha_disp: string;
  num_preguntas: number;
}

export interface Jugador {
  jugadorId: number;
  grupoId: number;
  nombre: string;
  apellido: string;
  player_name: string;
}