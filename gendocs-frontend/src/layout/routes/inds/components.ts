import { lazy } from "react";

export const BuscarOutlet = lazy(
  () => import("pages/private/inds/buscar/Buscar")
);

export const ProcesosINDSOutlet = lazy(() =>
  import("pages/private/inds/procesos/Procesos").then((m) => ({
    default: m.ProcesosOutlet,
  }))
);

export const ProcesosINDS = lazy(() =>
  import("pages/private/facu/procesos/Procesos").then((m) => ({
    default: m.Procesos,
  }))
);

export const ConsejosINDSOUTLET = lazy(() =>
  import("pages/private/inds/consejos/Consejos").then((m) => ({
    default: m.ConsejosOutlet,
  }))
);

export const DocumentosINDSOUTLET = lazy(
  () => import("pages/private/inds/documentos/Documentos")
);

// export const AddEstudiante = lazy(
//   () => import("pages/private/facu/estudiantes/components/AddEstudiante")
// );

// export const Estudiantes = lazy(
//   () => import("pages/private/facu/estudiantes/Estudiantes")
// );

// export const UpdateEstudiante = lazy(
//   () => import("pages/private/facu/estudiantes/components/UpdateEstudiante")
// );

// export const DriveTemplate = lazy(() => import("components/DriveTemplate"));