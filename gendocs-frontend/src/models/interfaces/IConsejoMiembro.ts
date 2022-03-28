import { IConsejo } from ".";
import { IDocente } from "./IDocente";

export interface IMiembro {
  id: number;
  consejo: IConsejo;
  docente: IDocente;
  asistira: boolean;
  notificado: boolean;
  responsable: boolean;
}

type PreConsejoMiembroForm = Omit<
  IMiembro,
  "id" | "asistira" | "notificado" | "consejo" | "docente"
>;

export interface ConsejoMiembroForm extends PreConsejoMiembroForm {
  consejo: number;
  docente: number;
}
