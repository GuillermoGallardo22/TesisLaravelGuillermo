import { ICarrera } from "./ICarrera";

export interface IEstudiante {
  id: number;
  cedula: string;
  nombres: string;
  apellidos: string;
  celular: string | null;
  correo_uta: string | null;
  matricula: string | null;
  folio: string | null;
  carrera: number | ICarrera;
  telefono?: string | null;
  correo?: string | null;
}
