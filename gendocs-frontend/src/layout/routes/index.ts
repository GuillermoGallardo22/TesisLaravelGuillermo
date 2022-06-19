import { ModuleEnum } from "models/enums";
import { IModule } from "models/interfaces";
import {
  routes as facuRoutes,
  DEFAULT_ROUTE as FACU_DEFAULT_ROUTE,
} from "./facu";
import {
  routes as sudeRoutes,
  DEFAULT_ROUTE as SUDE_DEFAULT_ROUTE,
} from "./sude";

export const allRoutes = [...facuRoutes, ...sudeRoutes];

export function getDefaultRoutes(modules: IModule[]): string {
  const main = modules[0];

  switch (main.code) {
    case ModuleEnum.FACU:
      return FACU_DEFAULT_ROUTE;
    case ModuleEnum.SUDE:
      return SUDE_DEFAULT_ROUTE;
    default:
      throw new Error("DEFAULT ROUTE NOT FOUND");
  }
}
