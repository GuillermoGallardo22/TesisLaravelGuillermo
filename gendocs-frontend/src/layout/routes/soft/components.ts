import { lazy } from "react";

export const BuscarOutlet = lazy(
  () => import("pages/private/soft/buscar/Buscar")
);

export const ProcesosSOFTOutlet = lazy(() =>
  import("pages/private/soft/procesos/Procesos").then((m) => ({
    default: m.ProcesosOutlet,
  }))
);

export const ProcesosSOFT = lazy(() =>
  import("pages/private/facu/procesos/Procesos").then((m) => ({
    default: m.Procesos,
  }))
);

export const ConsejosSOFTOUTLET = lazy(() =>
  import("pages/private/soft/consejos/Consejos").then((m) => ({
    default: m.ConsejosOutlet,
  }))
);

export const DocumentosSOFTOUTLET = lazy(
  () => import("pages/private/soft/documentos/Documentos")
);
