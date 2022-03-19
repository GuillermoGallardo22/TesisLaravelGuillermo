import { IConsejo } from "./IConsejo";

export interface IReservaForm {
    desde: number;
    hasta: number;
    consejo: number;
}

export interface INumeracionBase {
    id: number;
    numero: number;
    consejo: IConsejo;
}

export interface INumeracion {
    siguiente: number;
    reservados: INumeracionBase[];
    encolados: number[];
}
