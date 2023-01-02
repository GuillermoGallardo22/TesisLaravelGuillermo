import { ICarrera } from "./ICarrera";

export interface IDocente {
  id: number;
  cedula: string;
  nombres: string;
  celular: string;
  correo_uta: string;
  correo: string;
  telefono: string;
  genero: string | null | number;
  carrera: ICarrera;
}

export interface IUpdateDocente extends Omit<IDocente, "carrera"> {
  carrera: number;
}


// export type DocenteForm = Omit<IDocente, "id">;

export interface DocenteForm
  extends Omit<
    IDocente,
    | "id"
    | "cedula"
    | "nombres"
    | "celular"
    | "correo_uta"
    | "correo"
    | "telefono"
    | "carrera"
  > {
    cedula: string;
  nombres: string;
  celular: string;
  correo_uta: string;
  correo: string;
  telefono: string;
  carrera: number;
}
