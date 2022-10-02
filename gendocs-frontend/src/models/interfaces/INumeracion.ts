import { ModuleEnum } from "../enums";
import { IConsejo } from "./IConsejo";

export interface IReservaForm {
  desde: number;
  hasta: number;
  consejo: number;
  module: ModuleEnum;
}

export interface INumeracionBase {
  id: number;
  numero: number;
}

export interface INumeracionReservado extends INumeracionBase {
  consejo: IConsejo;
}

export interface INumeracion {
  siguiente: number;
  reservados: INumeracionReservado[];
  encolados: INumeracionBase[];
}

export type INumeracionActaGrado = Omit<INumeracion, "reservados">;
