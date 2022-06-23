import { ModuleEnum, RolEnum } from "models/enums";
import { IRoute } from "models/interfaces";
import { Outlet } from "react-router-dom";
import {
  Acta,
  AddConsejo,
  AddDocumento,
  AddPlantilla,
  AddProceso,
  AddReserva,
  Consejos,
  DocumentosFACU,
  DriveTemplate,
  Home,
  ListMiembros,
  ListPlantillas,
  ListResoluciones,
  UpdateConsejo,
  UpdatePlantilla,
  UpdateProceso,
} from "../facu/components";
import {
  BuscarOutlet,
  ConsejosSUDEOUTLET,
  DocumentosSUDEOUTLET,
  ProcesosSUDE,
  ProcesosSUDEOutlet,
} from "./components";

export const routes: IRoute[] = [
  {
    path: "inicio-sude",
    label: "Buscar",
    component: BuscarOutlet,
    icon: "search",
    modules: [ModuleEnum.SUDE],
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
    path: "documentos-sude",
    label: "Documentos",
    component: DocumentosSUDEOUTLET,
    icon: "topic",
    modules: [ModuleEnum.SUDE],
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
    path: "procesos-sude",
    label: "Procesos",
    component: ProcesosSUDEOutlet,
    icon: "list",
    modules: [ModuleEnum.SUDE],
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
      { path: "", isIndex: true, component: ProcesosSUDE },
    ],
  },
  {
    path: "consejos-sude",
    label: "Consejos",
    component: ConsejosSUDEOUTLET,
    icon: "meetingRoom",
    modules: [ModuleEnum.SUDE],
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
];

export const DEFAULT_ROUTE = routes[0].path;

export function getRoutes(a: any, b: any): IRoute[] {
  return routes.filter((r) => r.isMenuOption);
}
