import { IconTypes, Outlet } from "components";
import { RolEnum } from "models/enums";
import {
  Acta,
  AddCarrera,
  AddConsejo,
  AddDocente,
  AddDocumento,
  AddEstudiante,
  AddPlantilla,
  AddProceso,
  AddReserva,
  AddUsuario,
  Carreras,
  Consejos,
  Docentes,
  Documentos,
  DriveTemplate,
  Estudiantes,
  Home,
  ListMiembros,
  ListPlantillas,
  Procesos,
  Profile,
  UpdateCarrera,
  UpdateConsejo,
  UpdateDocente,
  UpdateEstudiante,
  UpdatePlantilla,
  UpdateProceso,
  UpdateUsuario,
  Usuarios,
} from "./components";

export interface IRoute {
  path: string;
  component: React.FunctionComponent;
  isIndex?: boolean;
  label?: string;
  icon?: IconTypes;
  childrens?: IRoute[];
  roles?: RolEnum[];
}

export const DEFAULT_ROUTE = "inicio";

export const routes: IRoute[] = [
  {
    path: DEFAULT_ROUTE,
    label: "Inicio",
    component: Home,
    icon: "home",
  },
  {
    path: "documentos",
    label: "Documentos",
    component: Outlet,
    icon: "topic",
    childrens: [
      {
        path: "nuevo",
        component: AddDocumento,
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
      },
      {
        path: "reservar",
        component: AddReserva,
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP],
      },
      {
        path: "drive/:driveId",
        component: DriveTemplate,
      },
      { path: "", isIndex: true, component: Documentos },
    ],
  },
  {
    path: "carreras",
    label: "Carreras",
    component: Outlet,
    icon: "apartment",
    childrens: [
      {
        path: "nuevo",
        component: AddCarrera,
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP],
      },
      {
        path: ":carreraId",
        component: UpdateCarrera,
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP],
      },
      { path: "", isIndex: true, component: Carreras },
    ],
  },
  {
    path: "docentes",
    label: "Docentes",
    component: Outlet,
    icon: "hail",
    childrens: [
      {
        path: "nuevo",
        component: AddDocente,
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
      },
      {
        path: ":docenteId",
        component: UpdateDocente,
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
      },
      { path: "", isIndex: true, component: Docentes },
    ],
  },
  {
    path: "estudiantes",
    label: "Estudiantes",
    component: Outlet,
    icon: "school",
    childrens: [
      {
        path: "nuevo",
        component: AddEstudiante,
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
      },
      {
        path: ":studentId",
        component: UpdateEstudiante,
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
      },
      { path: "", isIndex: true, component: Estudiantes },
    ],
  },
  {
    path: "procesos",
    label: "Procesos",
    component: Outlet,
    icon: "list",
    childrens: [
      {
        path: "nuevo",
        component: AddProceso,
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
      },
      {
        path: ":processId",
        component: Outlet,
        childrens: [
          {
            path: "plantillas",
            component: Outlet,
            childrens: [
              {
                path: "nuevo",
                component: AddPlantilla,
                roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
              },
              {
                path: ":templateId",
                component: Outlet,
                childrens: [
                  {
                    path: "drive/:driveId",
                    component: DriveTemplate,
                  },
                  {
                    path: "",
                    isIndex: true,
                    component: UpdatePlantilla,
                    roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
                  },
                ],
              },
              {
                path: "",
                label: "",
                isIndex: true,
                component: ListPlantillas,
              },
            ],
          },
          {
            path: "",
            isIndex: true,
            component: UpdateProceso,
            roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
          },
        ],
      },
      { path: "", isIndex: true, component: Procesos },
    ],
  },
  {
    path: "consejos",
    label: "Consejos",
    component: Outlet,
    icon: "meetingRoom",
    childrens: [
      {
        path: "nuevo",
        component: AddConsejo,
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP],
      },
      {
        path: "plantilla-acta/:driveId",
        component: DriveTemplate,
      },
      {
        path: "plantilla-separador/:driveId",
        component: DriveTemplate,
      },
      {
        path: ":consejoId",
        component: Outlet,
        childrens: [
          {
            path: "asistencia",
            component: ListMiembros,
            roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP],
          },
          {
            path: "acta",
            component: Outlet,
            roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP],
            childrens: [
              {
                path: "drive/:driveId",
                component: DriveTemplate,
              },
              {
                path: "",
                component: Acta,
                isIndex: true,
              },
            ],
          },
          {
            path: "",
            isIndex: true,
            component: UpdateConsejo,
            roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP],
          },
        ],
      },
      { path: "", isIndex: true, component: Consejos },
    ],
  },
  {
    path: "usuarios",
    label: "Usuarios",
    component: Outlet,
    icon: "groupAdd",
    childrens: [
      { path: "nuevo", component: AddUsuario },
      { path: ":userId", component: UpdateUsuario },
      { path: "", isIndex: true, component: Usuarios },
    ],
    roles: [RolEnum.ADMIN],
  },
  {
    path: "profile",
    label: "Perfil",
    component: Profile,
    icon: "accountCircle",
  },
];
