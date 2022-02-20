import { RolEnum } from "models/enums/Rol";

export interface IUser {
    id: number;
    email: string;
    email_gmail: string;
    name: string;
    roles: RolEnum[];
}

export interface IUserForm {
    id?: number;
    nombre: string;
    correo_principal: string;
    correo_secundario: string;
    rol: number;
}
