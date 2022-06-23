import { lazy } from "react";

export const BuscarOutlet = lazy(
  () => import("pages/private/titu/buscar/Buscar")
);

export const ProcesosTITUOUTLET = lazy(
  () => import("pages/private/titu/procesos/Procesos")
);

export const ConsejosTITUOUTLET = lazy(
  () => import("pages/private/titu/consejos/Consejos")
);
