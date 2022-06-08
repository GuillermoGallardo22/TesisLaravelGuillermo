import { ModuleEnum } from "models/enums";

export interface IProceso {
  id: number;
  nombre: string;
  estado: boolean;
}

export interface IProcesoForm extends IProceso {
  module: ModuleEnum;
}
