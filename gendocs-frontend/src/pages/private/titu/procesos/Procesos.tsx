import { ModuleEnum } from "models/enums/Module";
import ModuleProvider from "providers/ModuleProvider";
import { Outlet } from "react-router-dom";

const ProcesosOutlet = () => (
  <ModuleProvider module={ModuleEnum.TITU}>
    <Outlet />
  </ModuleProvider>
);

export default ProcesosOutlet;
