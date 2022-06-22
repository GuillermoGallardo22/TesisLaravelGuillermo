import { ModuleEnum } from "models/enums";
import ModuleProvider from "providers/ModuleProvider";
import { Outlet } from "react-router-dom";

export const ProcesosOutlet = () => (
  <ModuleProvider module={ModuleEnum.TITU}>
    <Outlet />
  </ModuleProvider>
);
