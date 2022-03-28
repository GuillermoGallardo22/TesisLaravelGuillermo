import { ITipoConsejo } from "./ITipoConsejo";

export interface IConsejo {
  id: number;
  nombre: string;
  fecha: string;
  estado: boolean;
  tipo_consejo: number | ITipoConsejo;
}

export interface IConsejoForm {
  id: number;
  tipo_consejo: number;
  nombre: string;
  fecha: Date;
}
