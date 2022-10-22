import { ModuleEnum } from "models/enums/Module";

export interface IModule {
  id: number;
  name: string;
  code: ModuleEnum;
}

export interface ModuleContextProps {
  module: ModuleEnum;
}
