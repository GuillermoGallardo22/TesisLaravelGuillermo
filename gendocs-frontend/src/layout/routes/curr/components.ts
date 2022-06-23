import { lazy } from "react";

export const BuscarOutlet = lazy(
  () => import("pages/private/curr/buscar/Buscar")
);

export const ProcesosCURROUTLET = lazy(
  () => import("pages/private/curr/procesos/Procesos")
);

export const ConsejosCURROUTLET = lazy(
  () => import("pages/private/curr/consejos/Consejos")
);
