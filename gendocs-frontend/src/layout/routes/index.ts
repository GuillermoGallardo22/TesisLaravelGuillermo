import { ModuleEnum } from "models/enums/Module";
import { IModule } from "models/interfaces/IModule";
import {
  DEFAULT_ROUTE as COMM_DEFAULT_ROUTE,
  routes as commRoutes,
} from "./common";
import {
  DEFAULT_ROUTE as CURR_DEFAULT_ROUTE,
  routes as currRoutes,
} from "./curr";
import {
  DEFAULT_ROUTE as FACU_DEFAULT_ROUTE,
  routes as facuRoutes,
} from "./facu";
import {
  DEFAULT_ROUTE as SUDE_DEFAULT_ROUTE,
  routes as sudeRoutes,
} from "./sude";
import {
  DEFAULT_ROUTE as TITU_DEFAULT_ROUTE,
  routes as tituRoutes,
} from "./titu";

export const allRoutes = [
  ...facuRoutes,
  ...sudeRoutes,
  ...tituRoutes,
  ...currRoutes,
  ...commRoutes,
];

export function getDefaultRoutes(modules: IModule[]): string {
  const main = modules[0];

  switch (main.code) {
    case ModuleEnum.FACU:
      return FACU_DEFAULT_ROUTE;
    case ModuleEnum.SUDE:
      return SUDE_DEFAULT_ROUTE;
    case ModuleEnum.TITU:
      return TITU_DEFAULT_ROUTE;
    case ModuleEnum.CURR:
      return CURR_DEFAULT_ROUTE;
    case ModuleEnum.COMM:
      return COMM_DEFAULT_ROUTE;
    default:
      throw new Error("DEFAULT ROUTE NOT FOUND");
  }
}
