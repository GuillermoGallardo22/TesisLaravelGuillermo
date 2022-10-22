import { ICarrera } from "./ICarrera";

export interface IEstudiante {
  id: number;
  cedula: string;
  nombres: string;
  apellidos: string;
  genero: string | null | number;
  fecha_nacimiento: string | null | Date;
  celular: string | null;
  correo_uta: string | null;
  matricula: string | null;
  folio: string | null;
  carrera: ICarrera;
  telefono?: string | null;
  correo?: string | null;
}

export interface IUpdateEstudiante extends Omit<IEstudiante, "carrera"> {
  carrera: number;
}

export interface MultipleStudentForm
  extends Omit<
    IEstudiante,
    | "telefono"
    | "celular"
    | "correo"
    | "correo_uta"
    | "matricula"
    | "folio"
    | "genero"
    | "fecha_nacimiento"
    | "carrera"
  > {
  telefono: string;
  celular: string;
  correo: string;
  correo_uta: string;
  matricula: string;
  folio: string;
  genero: string;
  fecha_nacimiento: string;
}

export interface SimpleStudentForm
  extends Omit<
    IEstudiante,
    | "id"
    | "telefono"
    | "celular"
    | "correo"
    | "correo_uta"
    | "matricula"
    | "folio"
    | "carrera"
  > {
  telefono: string;
  celular: string;
  correo: string;
  correo_uta: string;
  matricula: string;
  folio: string;
  carrera: number;
}
