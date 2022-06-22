import { lazy } from "react";

export const ProcesosTITUOUTLET = lazy(
  () => import("pages/private/titu/procesos/Procesos")
);

export const ConsejosTITUOUTLET = lazy(
  () => import("pages/private/titu/consejos/Consejos")
);
