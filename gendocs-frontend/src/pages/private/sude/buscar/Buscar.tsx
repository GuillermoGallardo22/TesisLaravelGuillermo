import { ModuleEnum } from "models/enums";
import ModuleProvider from "providers/ModuleProvider";
import { Outlet } from "react-router-dom";

const Buscar = () => (
  <ModuleProvider module={ModuleEnum.SUDE}>
    <Outlet />
  </ModuleProvider>
);

export default Buscar;
