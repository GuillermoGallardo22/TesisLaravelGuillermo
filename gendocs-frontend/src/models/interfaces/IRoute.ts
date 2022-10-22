import { IconTypes } from "components/Icon";
import { ModuleEnum } from "models/enums/Module";
import { RolEnum } from "models/enums/Rol";

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
