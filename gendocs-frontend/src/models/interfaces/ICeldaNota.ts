export interface ICeldaNota {
  id: number;
  descripcion: string;
  celda: string;
}

export interface ICreateCeldaNota extends Omit<ICeldaNota, "id"> {
  tipo_acta_grado: number;
}
