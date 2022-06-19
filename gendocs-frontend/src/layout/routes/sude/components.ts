import { lazy } from "react";

// SUDE
export const ProcesosSUDEOutlet = lazy(() =>
  import("pages/private/sude/procesos/Procesos").then((m) => ({
    default: m.ProcesosOutlet,
  }))
);

export const ProcesosSUDE = lazy(() =>
  import("pages/private/facu/procesos/Procesos").then((m) => ({
    default: m.Procesos,
  }))
);

export const ConsejosSUDEOUTLET = lazy(() =>
  import("pages/private/sude/consejos/Consejos").then((m) => ({
    default: m.ConsejosOutlet,
  }))
);
