import { ModuleEnum } from "models/enums/Module";
import { RolEnum } from "models/enums/Rol";
import { IRoute } from "models/interfaces/IRoute";
import { Outlet } from "react-router-dom";
import { DriveTemplate } from "../facu/components";
import * as Components from "./components";

export const routes: IRoute[] = [
  {
    path: "actas-grado",
    label: "Actas de grado",
    component: Outlet,
    icon: "historyEdu",
    modules: [ModuleEnum.COMM],
    isMenuOption: true,
    childrens: [
      {
        path: "asistencia/:actaGradoId",
        component: Components.AsistentesActaGrado,
        roles: [
          RolEnum.ADMIN,
          RolEnum.ADMINTEMP,
          RolEnum.READER,
          RolEnum.WRITER,
        ],
      },
      {
        path: ":actaGradoId",
        component: Components.UpdateActaGrado,
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
      },
      {
        path: "nuevo",
        component: Components.AddActaGrado,
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP],
      },
      {
        path: "reporteinicial",
        component: Components.ActaGradoReporteInicial,
        roles: [],
      },
      {
        path: "reportefinal",
        component: Components.ActaGradoReporteFinal,
        roles: [],
      },
      {
        path: "drive/:driveId",
        component: DriveTemplate,
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
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP],
        childrens: [
          {
            path: "drive/:driveId",
            component: DriveTemplate,
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
];

export const DEFAULT_ROUTE = routes[0].path;

export function getRoutes(): IRoute[] {
  return routes.filter((r) => r.isMenuOption);
}
