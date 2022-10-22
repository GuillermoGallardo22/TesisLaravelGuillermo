import { IProceso } from "./IProceso";
import { IUser } from "./IUser";

export interface IPlantilla {
  id: number;
  nombre: string;
  estado: boolean;
  proceso: number | IProceso;
  drive: string;
  autor?: IUser;
}
