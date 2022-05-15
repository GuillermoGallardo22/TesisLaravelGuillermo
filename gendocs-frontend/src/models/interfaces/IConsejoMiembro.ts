import { IConsejo } from ".";
import { IDocente } from "./IDocente";

export interface IMiembro {
  id: number;
  consejo: IConsejo;
  docente: IDocente;
  asistio: boolean;
  notificado: boolean;
  responsable: boolean;
}

type PreConsejoMiembroForm = Omit<
  IMiembro,
  "id" | "asistio" | "notificado" | "consejo" | "docente"
>;

export interface ConsejoMiembroForm extends PreConsejoMiembroForm {
  consejo: number;
  docente: number;
}
