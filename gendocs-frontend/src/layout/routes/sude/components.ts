import { lazy } from "react";

export const BuscarOutlet = lazy(
  () => import("pages/private/sude/buscar/Buscar")
);

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

export const DocumentosSUDEOUTLET = lazy(
  () => import("pages/private/sude/documentos/Documentos")
);

export const AddEstudiante = lazy(
  () => import("pages/private/facu/estudiantes/components/AddEstudiante")
);

export const Estudiantes = lazy(
  () => import("pages/private/facu/estudiantes/Estudiantes")
);

export const UpdateEstudiante = lazy(
  () => import("pages/private/facu/estudiantes/components/UpdateEstudiante")
);

export const DriveTemplate = lazy(() => import("components/DriveTemplate"));

