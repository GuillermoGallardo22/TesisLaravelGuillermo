import { ModuleEnum } from "models/enums/Module";
import { RolEnum } from "models/enums/Rol";
import { IRoute } from "models/interfaces/IRoute";
import { Outlet } from "react-router-dom";
import * as SharedFacuModuleComponents from "../facu/components";
import * as CurrentModuleComponents from "./components";

export const routes: IRoute[] = [
  {
    path: "inicio-titu",
    label: "Buscar",
    component: CurrentModuleComponents.BuscarOutlet,
    icon: "search",
    modules: [ModuleEnum.TITU],
    isMenuOption: true,
    childrens: [
      {
        path: "drive/:driveId",
        component: SharedFacuModuleComponents.DriveTemplate,
      },
      {
        path: "",
        isIndex: true,
        component: SharedFacuModuleComponents.Home,
      },
    ],
  },
  {
    path: "procesos-titu",
    label: "Procesos",
    component: CurrentModuleComponents.ProcesosTITUOUTLET,
    icon: "list",
    modules: [ModuleEnum.TITU],
    isMenuOption: true,
    childrens: [
      {
        path: "nuevo",
        component: SharedFacuModuleComponents.AddProceso,
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
                component: SharedFacuModuleComponents.AddPlantilla,
                roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
              },
              {
                path: ":templateId",
                component: Outlet,
                childrens: [
                  {
                    path: "drive/:driveId",
                    component: SharedFacuModuleComponents.DriveTemplate,
                  },
                  {
                    path: "",
                    isIndex: true,
                    component: SharedFacuModuleComponents.UpdatePlantilla,
                    roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
                  },
                ],
              },
              {
                path: "",
                label: "",
                isIndex: true,
                component: SharedFacuModuleComponents.ListPlantillas,
              },
            ],
          },
          {
            path: "",
            isIndex: true,
            component: SharedFacuModuleComponents.UpdateProceso,
            roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
          },
        ],
      },
      {
        path: "",
        isIndex: true,
        component: SharedFacuModuleComponents.ProcesosFACU,
      },
    ],
  },
  {
    path: "consejos-titu",
    label: "Consejos",
    component: CurrentModuleComponents.ConsejosTITUOUTLET,
    icon: "meetingRoom",
    modules: [ModuleEnum.TITU],
    childrens: [
      {
        path: "nuevo",
        component: SharedFacuModuleComponents.AddConsejo,
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP],
      },
      {
        path: "plantilla-acta/:driveId",
        component: SharedFacuModuleComponents.DriveTemplate,
      },
      {
        path: "plantilla-separador/:driveId",
        component: SharedFacuModuleComponents.DriveTemplate,
      },
      {
        path: ":consejoId",
        component: Outlet,
        childrens: [
          {
            path: "asistencia",
            component: SharedFacuModuleComponents.ListMiembros,
            roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP],
          },
          {
            path: "acta",
            component: Outlet,
            roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP],
            childrens: [
              {
                path: "drive/:driveId",
                component: SharedFacuModuleComponents.DriveTemplate,
              },
              {
                path: "",
                component: SharedFacuModuleComponents.Acta,
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
                component: SharedFacuModuleComponents.DriveTemplate,
              },
              {
                path: "",
                isIndex: true,
                component: SharedFacuModuleComponents.ListResoluciones,
              },
            ],
          },
          {
            path: "",
            isIndex: true,
            component: SharedFacuModuleComponents.UpdateConsejo,
            roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP],
          },
        ],
      },
      {
        path: "",
        isIndex: true,
        component: SharedFacuModuleComponents.Consejos,
      },
    ],
    isMenuOption: true,
  },
];

export const DEFAULT_ROUTE = routes[0].path;

export function getRoutes(): IRoute[] {
  return routes.filter((r) => r.isMenuOption);
}
