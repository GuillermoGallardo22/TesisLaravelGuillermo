import { EstadoActaEnum, TipoActaGradoEnum } from "models/enums";

export interface ITipoActaGrado {
  id: number;
  nombre: string;
  codigo: TipoActaGradoEnum;
}

export interface IEstadoActa {
  id: number;
  codigo: EstadoActaEnum;
  nombre_mas: string;
  nombre_fem: string;
}
