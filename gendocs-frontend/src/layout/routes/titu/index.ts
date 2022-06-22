import { ModuleEnum, RolEnum } from "models/enums";
import { IRoute } from "models/interfaces";
import { Outlet } from "react-router-dom";
import {
  AddProceso,
  AddPlantilla,
  DriveTemplate,
  UpdatePlantilla,
  ListPlantillas,
  UpdateProceso,
  ProcesosFACU,
} from "../facu/components";
import { ProcesosTITUOUTLET } from "./components";

export const routes: IRoute[] = [
  {
    path: "procesos-titu",
    label: "Procesos",
    component: ProcesosTITUOUTLET,
    icon: "list",
    modules: [ModuleEnum.TITU],
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
];

export const DEFAULT_ROUTE = routes[0].path;

export function getRoutes(): IRoute[] {
  return routes.filter((r) => r.isMenuOption);
}
