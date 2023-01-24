import { ModuleEnum } from "models/enums/Module";
import ModuleProvider from "providers/ModuleProvider";
import { Outlet } from "react-router-dom";

const Documentos: React.FunctionComponent = () => (
  <ModuleProvider module={ModuleEnum.TELE}>
    <Outlet />
  </ModuleProvider>
);

export default Documentos;
