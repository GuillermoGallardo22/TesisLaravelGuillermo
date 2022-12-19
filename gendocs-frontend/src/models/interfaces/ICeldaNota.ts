export interface ICeldaNota {
  id: number;
  variable_nota: string;
  variable_nota_texto: string;
  celda: string;
}

export interface ICreateCeldaNota
  extends Omit<ICeldaNota, "id" | "variable_nota_texto"> {
  tipo_acta_grado: number;
}
