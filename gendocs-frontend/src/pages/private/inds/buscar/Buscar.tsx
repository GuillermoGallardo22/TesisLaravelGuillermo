import { ModuleEnum } from "models/enums/Module";
import ModuleProvider from "providers/ModuleProvider";
import { Outlet } from "react-router-dom";

const Buscar = () => (
  <ModuleProvider module={ModuleEnum.INDS}>
    <Outlet />
  </ModuleProvider>
);

export default Buscar;
