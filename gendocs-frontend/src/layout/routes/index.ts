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
//TITULACION

import {
  DEFAULT_ROUTE as SIST_DEFAULT_ROUTE,
  routes as sistRoutes,
} from "./sist";

import {
  DEFAULT_ROUTE as INPA_DEFAULT_ROUTE,
  routes as inpaRoutes,
} from "./inpa";

import {
  DEFAULT_ROUTE as ELEC_DEFAULT_ROUTE,
  routes as elecRoutes,
} from "./elec";

//TITULACION

//INTEGRACION CURRICULAR

import {
  DEFAULT_ROUTE as SOFT_DEFAULT_ROUTE,
  routes as softRoutes,
} from "./soft";

import {
  DEFAULT_ROUTE as TECI_DEFAULT_ROUTE,
  routes as teciRoutes,
} from "./teci";

import {
  DEFAULT_ROUTE as TELE_DEFAULT_ROUTE,
  routes as teleRoutes,
} from "./tele";

import {
  DEFAULT_ROUTE as INDS_DEFAULT_ROUTE,
  routes as indsRoutes,
} from "./inds";

//INTEGRACION CURRICULAR
import {
  DEFAULT_ROUTE as TITU_DEFAULT_ROUTE,
  routes as tituRoutes,
} from "./titu";

export const allRoutes = [
  ...facuRoutes,
  ...sudeRoutes,
   //TITULACION
   ...sistRoutes,
   ...inpaRoutes,
   ...elecRoutes,
   //TITULACION
   //INTEGRACION CURRICULAR
   ...softRoutes,
   ...teciRoutes,
   ...teleRoutes,
   ...indsRoutes,
   //INTEGRACION CURRICULAR
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
    //TITULACION
    case ModuleEnum.SIST:
      return SIST_DEFAULT_ROUTE;
    case ModuleEnum.INPA:
      return INPA_DEFAULT_ROUTE;     
    case ModuleEnum.ELEC:
      return ELEC_DEFAULT_ROUTE;     
      //TITULACION
      //INTEGRACION CURRICULAR
      case ModuleEnum.SOFT:
        return SOFT_DEFAULT_ROUTE;
        case ModuleEnum.TECI:
          return TECI_DEFAULT_ROUTE;
          case ModuleEnum.TELE:
            return TELE_DEFAULT_ROUTE;
            case ModuleEnum.INDS:
              return INDS_DEFAULT_ROUTE;
      //INTEGRACION CURRICULAR
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
