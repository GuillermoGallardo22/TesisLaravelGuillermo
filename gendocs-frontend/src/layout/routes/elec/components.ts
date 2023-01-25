import { lazy } from "react";

export const BuscarOutlet = lazy(
  () => import("pages/private/elec/buscar/Buscar")
);

export const ProcesosELECOutlet = lazy(() =>
  import("pages/private/elec/procesos/Procesos").then((m) => ({
    default: m.ProcesosOutlet,
  }))
);

export const ProcesosELEC = lazy(() =>
  import("pages/private/facu/procesos/Procesos").then((m) => ({
    default: m.Procesos,
  }))
);

export const ConsejosELECOUTLET = lazy(() =>
  import("pages/private/elec/consejos/Consejos").then((m) => ({
    default: m.ConsejosOutlet,
  }))
);

export const DocumentosELECOUTLET = lazy(
  () => import("pages/private/elec/documentos/Documentos")
);
