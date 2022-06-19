import { IconTypes } from "components";
import { ModuleEnum, RolEnum } from "models/enums";

export interface IRoute {
  path: string;
  component: any;
  isMenuOption?: boolean;
  isIndex?: boolean;
  label?: string;
  icon?: IconTypes;
  childrens?: IRoute[];
  roles?: RolEnum[];
  modules?: ModuleEnum[];
}
