import { ModuleEnum } from "models/enums";
import { ProcesosBase } from "pages/private/facu/procesos/Procesos";
import ModuleProvider from "providers/ModuleProvider";

const Procesos = () => (
  <ModuleProvider module={ModuleEnum.SUDE}>
    <ProcesosBase />
  </ModuleProvider>
);

export default Procesos;
