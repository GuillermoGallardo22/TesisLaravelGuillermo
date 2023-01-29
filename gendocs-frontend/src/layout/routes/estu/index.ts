import { ModuleEnum } from "models/enums/Module";
import { RolEnum } from "models/enums/Rol";
import { IRoute } from "models/interfaces/IRoute";
import { Outlet } from "react-router-dom";
import { DriveTemplate } from "../facu/components";
import * as Components from "./components";
//estudiante
export const routes: IRoute[] = [
  {
    path: "estudiantes",
    label: "Estudiantes",
    component: Outlet,
    icon: "school",
    modules: [ModuleEnum.ESTU],
    isMenuOption: true,
    childrens: [
      {
        path: "nuevo",
        component: Outlet,
        roles: [
          RolEnum.ADMIN,
          RolEnum.ADMINTEMP,
          RolEnum.READER,
          RolEnum.WRITER,
        ],
        childrens: [
          { 
            path: "formato/:driveId", 
            component: DriveTemplate 
          },
          { 
            path: "", 
            isIndex: true,
             component: Components.AddEstudiante
         },
        ],
      },
      {
        path: ":studentId",
        component: Components.UpdateEstudiante,
        roles: [
          RolEnum.ADMIN,
           RolEnum.ADMINTEMP, 
           RolEnum.WRITER],
      },
      { 
        path: "",
         isIndex: true, 
         component: Components.Estudiantes
     },
    ],
  },
];

export const DEFAULT_ROUTE = routes[0].path;

export function getRoutes(): IRoute[] {
  return routes.filter((r) => r.isMenuOption);
}

