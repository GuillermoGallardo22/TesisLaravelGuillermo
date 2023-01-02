import { lazy } from "react";

export const BuscarOutlet = lazy(
  () => import("pages/private/tele/buscar/Buscar")
);

export const ProcesosTELEOutlet = lazy(() =>
  import("pages/private/tele/procesos/Procesos").then((m) => ({
    default: m.ProcesosOutlet,
  }))
);

export const ProcesosTELE = lazy(() =>
  import("pages/private/facu/procesos/Procesos").then((m) => ({
    default: m.Procesos,
  }))
);

export const ConsejosTELEOUTLET = lazy(() =>
  import("pages/private/tele/consejos/Consejos").then((m) => ({
    default: m.ConsejosOutlet,
  }))
);

export const DocumentosTELEOUTLET = lazy(
  () => import("pages/private/tele/documentos/Documentos")
);
