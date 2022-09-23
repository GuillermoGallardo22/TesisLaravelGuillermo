import {
  EstadoActaEnum,
  ModalidadActaGrado,
  TipoActaGradoEnum,
} from "models/enums";
import { ICarrera } from "./ICarrera";

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

export interface IAddActaGrado {
  numeracion: number;
  estudiante: number | null;
  presidente: number | null;
  canton: number | null;
  tipo_acta: number;
  titulo_bachiller: string;
  fecha_inicio_estudios: Date;
  fecha_fin_estudios: Date;
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
