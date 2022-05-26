import { ModuleEnum } from "models/enums";

export interface IModule {
  id: number;
  name: string;
  code: ModuleEnum;
}
