import { EstadoActaEnum, TipoActaGradoEnum } from "models/enums";
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
