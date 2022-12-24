import { lazy } from "react";

export const DocumentoActaGrado = lazy(
  () => import("pages/private/facu/actas-grado/components/DocumentoActaGrado")
);

export const UpdateActaGrado = lazy(
  () => import("pages/private/facu/actas-grado/components/UpdateActaGrado")
);

export const AsistentesActaGrado = lazy(
  () => import("pages/private/facu/actas-grado/components/AsistenciaActaGrado")
);

export const PlantillasActasGrado = lazy(
  () => import("pages/private/facu/actas-grado/components/PlantillasActaGrado")
);

export const ActasGrado = lazy(
  () => import("pages/private/facu/actas-grado/ActasGrado")
);

export const AddActaGrado = lazy(
  () => import("pages/private/facu/actas-grado/components/AddActaGrado")
);
