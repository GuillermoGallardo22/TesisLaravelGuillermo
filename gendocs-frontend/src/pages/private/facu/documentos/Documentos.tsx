import { ModuleEnum } from "models/enums";
import ModuleProvider from "providers/ModuleProvider";
import { Outlet } from "react-router-dom";

const DocumentosOutlet = () => (
  <ModuleProvider module={ModuleEnum.FACU}>
    <Outlet />
  </ModuleProvider>
);

export default DocumentosOutlet;
