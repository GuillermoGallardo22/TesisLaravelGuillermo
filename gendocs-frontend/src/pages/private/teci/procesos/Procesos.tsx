import { ModuleEnum } from "models/enums/Module";
import ModuleProvider from "providers/ModuleProvider";
import { Outlet } from "react-router-dom";

export const ProcesosOutlet = () => (
  <ModuleProvider module={ModuleEnum.TECI}>
    <Outlet />
  </ModuleProvider>
);
