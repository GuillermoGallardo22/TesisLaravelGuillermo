import { ModuleEnum } from "models/enums";
import ModuleProvider from "providers/ModuleProvider";
import { Outlet } from "react-router-dom";

const ConsejosOutlet = () => (
  <ModuleProvider module={ModuleEnum.CURR}>
    <Outlet />
  </ModuleProvider>
);

export default ConsejosOutlet;
