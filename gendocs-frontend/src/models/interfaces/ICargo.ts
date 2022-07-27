import { IDocente } from "./IDocente";

export interface ICargo {
  id: number;
  nombre: string;
  variable: string;
  docente: IDocente;
}

export interface IAddCargo extends Pick<ICargo, "nombre" | "variable"> {
  docente: number;
}

export type IUpdateCargo = IAddCargo;
