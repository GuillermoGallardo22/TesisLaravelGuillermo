import { IRoute } from "models/interfaces";
import { Outlet } from "react-router-dom";

export const routes: IRoute[] = [
  {
    component: Outlet,
    path: "",
  },
];

export const DEFAULT_ROUTE = routes[0].path;

export function getRoutes(a: any, b: any): IRoute[] {
  return routes.filter((r) => r.isMenuOption);
}
