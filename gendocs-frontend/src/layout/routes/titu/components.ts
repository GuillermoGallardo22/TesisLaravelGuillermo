import { lazy } from "react";

export const ProcesosTITUOUTLET = lazy(() =>
  import("pages/private/titu/procesos/Procesos").then((c) => ({
    default: c.ProcesosOutlet,
  }))
);
