import { ModuleEnum } from "models/enums/Module";
import { RolEnum } from "models/enums/Rol";
import { IRoute } from "models/interfaces/IRoute";
import { Outlet } from "react-router-dom";
import * as Components from "./components";

export const routes: IRoute[] = [
  {
    path: "inicio",
    label: "Buscar",
    component: Components.HomeOutlet,
    icon: "search",
    modules: [ModuleEnum.FACU],
    isMenuOption: true,
    childrens: [
      {
        path: "drive/:driveId",
        component: Components.DriveTemplate,
      },
      {
        path: "",
        isIndex: true,
        component: Components.Home,
      },
    ],
  },
  {
    path: "actas-grado",
    label: "Actas de grado",
    component: Outlet,
    icon: "historyEdu",
    modules: [ModuleEnum.FACU],
    isMenuOption: true,
    childrens: [
      {
        path: "asistencia/:actaGradoId",
        component: Components.AsistentesActaGrado,
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP],
      },
      {
        path: ":actaGradoId",
        component: Components.UpdateActaGrado,
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP],
      },
      {
        path: "nuevo",
        component: Components.AddActaGrado,
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
      },
      {
        path: "drive/:driveId",
        component: Components.DriveTemplate,
      },
      {
        path: "documento/:actaGradoId",
        component: Components.DocumentoActaGrado,
        roles: [
          RolEnum.ADMIN,
          RolEnum.ADMINTEMP,
          RolEnum.WRITER,
          RolEnum.READER,
        ],
      },
      {
        path: "plantillas",
        component: Outlet,
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
        childrens: [
          {
            path: "drive/:driveId",
            component: Components.DriveTemplate,
          },
          {
            path: "",
            isIndex: true,
            component: Components.PlantillasActasGrado,
          },
        ],
      },
      {
        path: "",
        isIndex: true,
        component: Components.ActasGrado,
      },
    ],
  },
  {
    path: "documentos",
    label: "Documentos",
    component: Components.DocumentosFACUOutlet,
    icon: "topic",
    modules: [ModuleEnum.FACU],
    isMenuOption: true,
    childrens: [
      {
        path: "nuevo",
        component: Components.AddDocumento,
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
      },
      {
        path: "reservar",
        component: Components.AddReserva,
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP],
      },
      {
        path: "drive/:driveId",
        component: Components.DriveTemplate,
      },
      { path: "", isIndex: true, component: Components.DocumentosFACU },
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
        component: Components.AddCarrera,
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP],
      },
      {
        path: ":carreraId",
        component: Components.UpdateCarrera,
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP],
      },
      { path: "", isIndex: true, component: Components.Carreras },
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
        component: Components.AddDocente,
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
      },
      {
        path: ":docenteId",
        component: Components.UpdateDocente,
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
      },
      { path: "", isIndex: true, component: Components.Docentes },
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
        component: Outlet,
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
        childrens: [
          { path: "formato/:driveId", component: Components.DriveTemplate },
          { path: "", isIndex: true, component: Components.AddEstudiante },
        ],
      },
      {
        path: ":studentId",
        component: Components.UpdateEstudiante,
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
      },
      { path: "", isIndex: true, component: Components.Estudiantes },
    ],
  },
  {
    path: "procesos",
    label: "Procesos",
    component: Components.ProcesosFACUOutlet,
    icon: "list",
    modules: [ModuleEnum.FACU],
    isMenuOption: true,
    childrens: [
      {
        path: "nuevo",
        component: Components.AddProceso,
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
                component: Components.AddPlantilla,
                roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
              },
              {
                path: ":templateId",
                component: Outlet,
                childrens: [
                  {
                    path: "drive/:driveId",
                    component: Components.DriveTemplate,
                  },
                  {
                    path: "",
                    isIndex: true,
                    component: Components.UpdatePlantilla,
                    roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
                  },
                ],
              },
              {
                path: "",
                label: "",
                isIndex: true,
                component: Components.ListPlantillas,
              },
            ],
          },
          {
            path: "",
            isIndex: true,
            component: Components.UpdateProceso,
            roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
          },
        ],
      },
      { path: "", isIndex: true, component: Components.ProcesosFACU },
    ],
  },
  {
    path: "consejos",
    label: "Consejos",
    component: Components.ConsejosFACUOUTLET,
    icon: "meetingRoom",
    modules: [ModuleEnum.FACU],
    childrens: [
      {
        path: "nuevo",
        component: Components.AddConsejo,
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP],
      },
      {
        path: "plantilla-acta/:driveId",
        component: Components.DriveTemplate,
      },
      {
        path: "plantilla-separador/:driveId",
        component: Components.DriveTemplate,
      },
      {
        path: ":consejoId",
        component: Outlet,
        childrens: [
          {
            path: "asistencia",
            component: Components.ListMiembros,
            roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP],
          },
          {
            path: "acta",
            component: Outlet,
            roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP],
            childrens: [
              {
                path: "drive/:driveId",
                component: Components.DriveTemplate,
              },
              {
                path: "",
                component: Components.Acta,
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
                component: Components.DriveTemplate,
              },
              {
                path: "",
                isIndex: true,
                component: Components.ListResoluciones,
              },
            ],
          },
          {
            path: "",
            isIndex: true,
            component: Components.UpdateConsejo,
            roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP],
          },
        ],
      },
      { path: "", isIndex: true, component: Components.Consejos },
    ],
    isMenuOption: true,
  },
  {
    path: "cargos",
    label: "Cargos",
    component: Outlet,
    icon: "style",
    modules: [ModuleEnum.FACU],
    isMenuOption: true,
    childrens: [
      {
        path: "nuevo",
        component: Components.AddCargo,
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
      },
      {
        path: ":cargoId",
        component: Components.UpdateCargo,
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
      },
      { path: "", isIndex: true, component: Components.Cargos },
    ],
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
      { path: "nuevo", component: Components.AddUsuario },
      { path: ":userId", component: Components.UpdateUsuario },
      { path: "", isIndex: true, component: Components.Usuarios },
    ],
  },
  {
    path: "profile",
    label: "Perfil",
    component: Components.Profile,
    icon: "accountCircle",
    modules: [ModuleEnum.FACU, ModuleEnum.SUDE, ModuleEnum.TITU],
  },
];

export const DEFAULT_ROUTE = routes[0].path;

export function getRoutes(a: any, b: any): IRoute[] {
  return routes.filter((r) => r.isMenuOption);
}
