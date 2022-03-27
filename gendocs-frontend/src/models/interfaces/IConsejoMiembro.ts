import { IConsejo } from ".";
import { IDocente } from "./IDocente";

export interface IConsejoMiembro {
    id: number;
    consejo: IConsejo;
    miembro: IDocente;
    asistira: boolean;
    notificado: boolean;
    responsable: boolean;
}

type PreConsejoMiembroForm = Omit<
    IConsejoMiembro,
    "id" | "asistira" | "notificado" | "consejo" | "miembro"
>;

export interface ConsejoMiembroForm extends PreConsejoMiembroForm {
    consejo: number;
    miembro: number;
}
