import { IConsejo } from "./IConsejo";
import { IDocente } from "./IDocente";
import { IEstudiante } from "./IEstudiante";

export interface IMiembro {
  id: number;
  consejo: IConsejo;
  docente: IDocente;
  estudiante: IEstudiante;
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
