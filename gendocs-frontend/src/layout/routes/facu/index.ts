import { ModuleEnum, RolEnum } from "models/enums";
import { IRoute } from "models/interfaces";
import { Outlet } from "react-router-dom";
import {
  DriveTemplate,
  Home,
  DocumentosFACUOutlet,
  AddDocumento,
  AddReserva,
  DocumentosFACU,
  AddCarrera,
  UpdateCarrera,
  Carreras,
  AddDocente,
  UpdateDocente,
  Docentes,
  AddEstudiante,
  UpdateEstudiante,
  Estudiantes,
  ProcesosFACUOutlet,
  AddProceso,
  AddPlantilla,
  UpdatePlantilla,
  ListPlantillas,
  UpdateProceso,
  ProcesosFACU,
  ConsejosFACUOUTLET,
  AddConsejo,
  ListMiembros,
  Acta,
  ListResoluciones,
  UpdateConsejo,
  Consejos,
  AddUsuario,
  UpdateUsuario,
  Usuarios,
  Profile,
} from "./components";

export const routes: IRoute[] = [
  {
    path: "inicio",
    label: "Inicio",
    component: Outlet,
    icon: "home",
    modules: [ModuleEnum.FACU],
    isMenuOption: true,
    childrens: [
      {
        path: "drive/:driveId",
        component: DriveTemplate,
      },
      {
        path: "",
        isIndex: true,
        component: Home,
      },
    ],
  },
  {
    path: "documentos",
    label: "Documentos",
    component: DocumentosFACUOutlet,
    icon: "topic",
    modules: [ModuleEnum.FACU],
    isMenuOption: true,
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
      { path: "", isIndex: true, component: DocumentosFACU },
    ],
  },
  {
    path: "carreras",
    label: "Carreras",
    component: Outlet,
    icon: "apartment",
    modules: [ModuleEnum.FACU],
    isMenuOption: true,
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
    modules: [ModuleEnum.FACU],
    isMenuOption: true,
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
    modules: [ModuleEnum.FACU],
    isMenuOption: true,
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
    component: ProcesosFACUOutlet,
    icon: "list",
    modules: [ModuleEnum.FACU],
    isMenuOption: true,
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
      { path: "", isIndex: true, component: ProcesosFACU },
    ],
  },
  {
    path: "consejos",
    label: "Consejos",
    component: ConsejosFACUOUTLET,
    icon: "meetingRoom",
    modules: [ModuleEnum.FACU],
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
            path: "documentos",
            component: Outlet,
            childrens: [
              {
                path: "drive/:driveId",
                component: DriveTemplate,
              },
              {
                path: "",
                isIndex: true,
                component: ListResoluciones,
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
    isMenuOption: true,
  },
  {
    path: "usuarios",
    label: "Usuarios",
    component: Outlet,
    icon: "groupAdd",
    modules: [ModuleEnum.FACU],
    isMenuOption: true,
    roles: [RolEnum.ADMIN],
    childrens: [
      { path: "nuevo", component: AddUsuario },
      { path: ":userId", component: UpdateUsuario },
      { path: "", isIndex: true, component: Usuarios },
    ],
  },
  {
    path: "profile",
    label: "Perfil",
    component: Profile,
    icon: "accountCircle",
    modules: [ModuleEnum.FACU, ModuleEnum.SUDE, ModuleEnum.TITU],
  },
];

export const DEFAULT_ROUTE = routes[0].path;

export function getRoutes(a: any, b: any): IRoute[] {
  return routes.filter((r) => r.isMenuOption);
}
