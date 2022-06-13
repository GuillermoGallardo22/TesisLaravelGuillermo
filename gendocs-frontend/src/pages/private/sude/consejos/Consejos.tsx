import { ModuleEnum } from "models/enums";
import ModuleProvider from "providers/ModuleProvider";
import { Outlet } from "react-router-dom";

export const ConsejosOutlet = () => (
  <ModuleProvider module={ModuleEnum.SUDE}>
    <Outlet />
  </ModuleProvider>
);
