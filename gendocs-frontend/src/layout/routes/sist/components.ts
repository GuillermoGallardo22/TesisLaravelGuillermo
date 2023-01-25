import { lazy } from "react";

export const BuscarOutlet = lazy(
  () => import("pages/private/sist/buscar/Buscar")
);

export const ProcesosSISTOutlet = lazy(() =>
  import("pages/private/sist/procesos/Procesos").then((m) => ({
    default: m.ProcesosOutlet,
  }))
);

export const ProcesosSIST = lazy(() =>
  import("pages/private/facu/procesos/Procesos").then((m) => ({
    default: m.Procesos,
  }))
);

export const ConsejosSISTOUTLET = lazy(() =>
  import("pages/private/sist/consejos/Consejos").then((m) => ({
    default: m.ConsejosOutlet,
  }))
);

export const DocumentosSISTOUTLET = lazy(
  () => import("pages/private/sist/documentos/Documentos")
);
