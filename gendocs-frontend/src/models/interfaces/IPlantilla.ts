import { IProceso } from ".";

export interface IPlantilla {
    id: number;
    nombre: string;
    estado: boolean;
    proceso: number | IProceso;
    drive: string;
}

export interface IMoveTemplateForm {
    proceso: number;
    plantilla: number;
}
