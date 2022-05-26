import { RolEnum } from "models/enums/Rol";
import { IModule } from "./IModule";

export interface IUser {
  id: number;
  email: string;
  email_gmail: string;
  name: string;
  roles: RolEnum[];
  status?: boolean;
  modulos: IModule[];
}

export interface IUserForm {
  id?: number;
  nombre: string;
  correo_principal: string;
  correo_secundario: string;
  rol: number;
  status?: boolean;
}

export interface IUpdatePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
