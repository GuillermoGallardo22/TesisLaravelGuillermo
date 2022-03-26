export interface IDocente {
    id: number;
    cedula: string;
    nombres: string;
    celular: string;
    correo_uta: string;
    correo: string;
    telefono: string;
}

export type DocenteForm = Omit<IDocente, "id">;
