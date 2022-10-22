import {
  EstadoActaEnum,
  ModalidadActaGrado,
  TipoActaGradoEnum,
} from "models/enums";
import { ICanton } from "./ICanton";
import { ICarrera } from "./ICarrera";
import { IDocente } from "./IDocente";
import { IEstudiante } from "./IEstudiante";
import { IModalidadActaGrado } from "./IModalidadActaGrado";

export interface ITipoActaGrado {
  id: number;
  nombre: string;
  codigo: TipoActaGradoEnum;
  carreras: ICarrera[];
  drive: string;
}

export interface IEstadoActa {
  id: number;
  codigo: EstadoActaEnum;
  nombre_mas: string;
  nombre_fem: string;
}

export interface IActaGrado {
  id: number;
  numero: number;
  estudiante: IEstudiante;
  presidente?: IDocente | null;
  canton: ICanton;
  tipo_acta: ITipoActaGrado;
  titulo_bachiller: string;
  fecha_inicio_estudios: Date;
  fecha_fin_estudios: Date;
  creditos_aprobados: number;
  horas_practicas: number;
  fecha_presentacion: Date | null;
  estado_acta: IEstadoActa;
  solicitar_especie: boolean;
  envio_financiero_especie: boolean;
  //
  modalidad_acta_grado: IModalidadActaGrado;
  link: string | null;
  aula: string | null;
  duracion: number | null;
}

export interface IAddActaGrado {
  numeracion: number;
  estudiante: number | null;
  presidente: number | null;
  canton: number | null;
  tipo_acta: number;
  titulo_bachiller: string;
  fecha_inicio_estudios: Date;
  fecha_fin_estudios: Date | null;
  creditos_aprobados: number;
  fecha_presentacion: Date | null;
  horas_practicas: number;
  estado_acta: number;
  solicitar_especie: boolean;
  envio_financiero_especie: boolean;
  // miembros_principales: number[];
  // miembros_suplentes: number[];
  //
  modalidad_acta_grado: ModalidadActaGrado | number;
  link: string;
  aula: number;
  duracion: number;
  //
}

export type useAddActaGradoProps = {
  estudiante?: IEstudiante | null | undefined;
};

export enum TipoAsistenteActaGradoEnum {
  PRESIDENTE = "PRESIDENTE",
  TUTOR = "TUTOR",
  M_PRINCIPAL = "M_PRINCIPAL",
  M_SUPLENTE = "M_SUPLENTE",
}

export interface IAddAsistenteActaGrado {
  docente: number;
  tipo: TipoAsistenteActaGradoEnum;
  informacion_adicional: string;
  actaGrado: number;
}

export interface IMiembroActaGrado {
  acta: IActaGrado;
  docente: IDocente;
  informacion_adicional: string | null;
  asistio: boolean;
  notificado: boolean;
}
