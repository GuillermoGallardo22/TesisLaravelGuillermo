import { lazy } from "react";

export const BuscarOutlet = lazy(
  () => import("pages/private/teci/buscar/Buscar")
);

export const ProcesosTECIOutlet = lazy(() =>
  import("pages/private/teci/procesos/Procesos").then((m) => ({
    default: m.ProcesosOutlet,
  }))
);

export const ProcesosTECI = lazy(() =>
  import("pages/private/facu/procesos/Procesos").then((m) => ({
    default: m.Procesos,
  }))
);

export const ConsejosTECIOUTLET = lazy(() =>
  import("pages/private/teci/consejos/Consejos").then((m) => ({
    default: m.ConsejosOutlet,
  }))
);

export const DocumentosTECIOUTLET = lazy(
  () => import("pages/private/teci/documentos/Documentos")
);
