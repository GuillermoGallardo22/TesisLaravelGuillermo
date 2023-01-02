import { ModuleEnum } from "models/enums/Module";
import ModuleProvider from "providers/ModuleProvider";
import { Outlet } from "react-router-dom";

export const ConsejosOutlet = () => (
  <ModuleProvider module={ModuleEnum.INPA}>
    <Outlet />
  </ModuleProvider>
);
