import { ModuleEnum } from "models/enums/Module";
import { RolEnum } from "models/enums/Rol";
import { IRoute } from "models/interfaces/IRoute";
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
  ProcesosPlantillasReporte,
  UpdateConsejo,
  UpdatePlantilla,
  UpdateProceso,
} from "../facu/components";
import {
  BuscarOutlet,
  ConsejosTECIOUTLET,
  DocumentosTECIOUTLET,
  ProcesosTECI,
  ProcesosTECIOutlet,
} from "./components";

export const routes: IRoute[] = [
  {
    path: "inicio-teci",
    label: "Buscar",
    component: BuscarOutlet,
    icon: "search",
    modules: [ModuleEnum.TECI],
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
    path: "documentos-teci",
    label: "Documentos",
    component: DocumentosTECIOUTLET,
    icon: "topic",
    modules: [ModuleEnum.TECI],
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
    path: "procesos-teci",
    label: "Procesos",
    component: ProcesosTECIOutlet,
    icon: "list",
    modules: [ModuleEnum.TECI],
    isMenuOption: true,
    childrens: [
      {
        path: "nuevo",
        component: AddProceso,
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
      },
      {
        path: "reporte",
        component: ProcesosPlantillasReporte,
        roles: [],
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
      { path: "", isIndex: true, component: ProcesosTECI },
    ],
  },
  {
    path: "consejos-teci",
    label: "Consejos",
    component: ConsejosTECIOUTLET,
    icon: "meetingRoom",
    modules: [ModuleEnum.TECI],
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
