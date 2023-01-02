import { lazy } from "react";

export const BuscarOutlet = lazy(
  () => import("pages/private/inpa/buscar/Buscar")
);

export const ProcesosINPAOutlet = lazy(() =>
  import("pages/private/inpa/procesos/Procesos").then((m) => ({
    default: m.ProcesosOutlet,
  }))
);

export const ProcesosINPA = lazy(() =>
  import("pages/private/facu/procesos/Procesos").then((m) => ({
    default: m.Procesos,
  }))
);

export const ConsejosINPAOUTLET = lazy(() =>
  import("pages/private/inpa/consejos/Consejos").then((m) => ({
    default: m.ConsejosOutlet,
  }))
);

export const DocumentosINPAOUTLET = lazy(
  () => import("pages/private/inpa/documentos/Documentos")
);
