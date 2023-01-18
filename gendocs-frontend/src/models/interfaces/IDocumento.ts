import { ModuleEnum } from "models/enums/Module";
import { IConsejo } from "./IConsejo";
import { IEstudiante } from "./IEstudiante";
import { IPlantilla } from "./IPlantilla";
import { IUser } from "./IUser";

export interface IDocumentoForm {
  consejo: number;
  proceso: number;
  plantilla: number;
  estudiante: number | null;
  descripcion: string | null;
  numero: number;
  docentes: number[];
  otro?: boolean;
  module: ModuleEnum;
}

export interface IDocumento {
  id: number;
  numero: number;
  descripcion: string | null;
  consejo: IConsejo;
  estudiante: IEstudiante | null;
  plantilla: IPlantilla;
  autor: IUser;
  drive: string | null;
  creado: string | Date;
  estado: boolean;
}
