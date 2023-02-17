import { EstadoActaEnum, TipoActaGradoEnum } from "models/enums/ActaGrado";
import { ModalidadActaGrado } from "models/enums/ModalidadActaGrado";
import { IAula } from "./IAula";
import { ICanton } from "./ICanton";
import { ICarrera } from "./ICarrera";
import { ICeldaNota } from "./ICeldaNota";
import { IDocente } from "./IDocente";
import { IEstudiante } from "./IEstudiante";
import { IModalidadActaGrado } from "./IModalidadActaGrado";

export interface IEstadoActa {
  id: number;
  codigo: EstadoActaEnum;
  nombre_mas: string;
  nombre_fem: string;
  //
  temp: string;
  estadoTemp: boolean;
}

interface ITipoEstadoActaGrado {
  id: number;
  drive: string;
  estado: IEstadoActa;
}

export interface ITipoActaGrado {
  id: number;
  nombre: string;
  codigo: TipoActaGradoEnum;
  celdasNotas: ICeldaNota[];
  estados: ITipoEstadoActaGrado[];
  drive: string;
}

export interface IActaGrado {
  id: number;
  numero: number;
  numero_aux: number;
  titulo_bachiller: string;
  fecha_inicio_estudios: Date;
  fecha_fin_estudios: Date | null;
  creditos_aprobados: number;
  horas_practicas: number;
  fecha_presentacion: Date | null;
  solicitar_especie: boolean;
  envio_financiero_especie: boolean;
  link: string;
  duracion: number | null;
  estudiante_id: number;
  carrera_id: number;
  canton_id: number;
  tipo_acta_id: number;
  estado_acta_id: number | null;
  aula_id: number | null;
  modalidad_acta_grado_id: number;
  directorio_id: number;
  created_user_id: number;
  updated_user_id: number | null;
  documento_notas: string | null;
  documento: string | null;
  // Relationships
  aula?: IAula;
  carrera: ICarrera;
  estudiante: IEstudiante;
  canton: ICanton;
  tipo_acta: ITipoActaGrado;
  modalidad_acta_grado: IModalidadActaGrado;
  estado_acta?: IEstadoActa;
  tema: string | null;
  //
  tipo?: ITipoActaGrado;
  miembros?: IMiembroActaGrado[];
  estadoTemp: boolean;
}

export interface IAddActaGrado {
  numeracion: number;
  numero_aux: number;
  estudiante: number | null;
  canton: number | null;
  tipo_acta: string;
  titulo_bachiller: string;
  fecha_inicio_estudios: Date;
  fecha_fin_estudios: Date | null;
  creditos_aprobados: number;
  fecha_presentacion: Date | null;
  horas_practicas: number;
  estado_acta: number;
  solicitar_especie: boolean;
  envio_financiero_especie: boolean;
  //
  modalidad_acta_grado: ModalidadActaGrado | string;
  link: string;
  aula: number;
  duracion: number;
  //
  tema: string;
}

export interface IUpdateActaGrado extends IAddActaGrado {
  id: number;
}

export type useAddActaGradoProps = {
  estudiante?: IEstudiante | null | undefined;
  onSuccess?: () => void;
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
  fecha_asignacion: Date | null;
}

export interface IMiembroActaGrado {
  id: number;
  acta: IActaGrado;
  docente: IDocente;
  informacion_adicional: string | null;
  asistio: boolean;
  notificado: boolean;
  fecha_asignacion: string | Date;
  //
  tipo?: TipoAsistenteActaGradoEnum;
}
