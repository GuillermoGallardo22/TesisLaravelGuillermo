export interface IUser {
    id: number;
    email: string;
    name: string;
}

export interface IUserForm {
    id?: number;
    nombre: string;
    correo_principal: string;
    correo_secundario: string;
    rol: number;
}
