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

// FACU

export const ListResoluciones = lazy(
  () => import("pages/private/facu/consejos/components/ListResoluciones")
);

export const AddDocente = lazy(
  () => import("pages/private/facu/docentes/components/AddDocente")
);

export const UpdateDocente = lazy(
  () => import("pages/private/facu/docentes/components/UpdateDocente")
);

export const Docentes = lazy(
  () => import("pages/private/facu/docentes/Docentes")
);

export const AddCarrera = lazy(
  () => import("pages/private/facu/carreras/components/AddCarrera")
);

export const Carreras = lazy(
  () => import("pages/private/facu/carreras/Carreras")
);

export const UpdateCarrera = lazy(
  () => import("pages/private/facu/carreras/components/UpdateCarrera")
);

export const Home = lazy(() => import("pages/private/facu/home/Home"));

export const AddConsejo = lazy(
  () => import("pages/private/facu/consejos/components/AddConsejo")
);

export const Consejos = lazy(
  () => import("pages/private/facu/consejos/Consejos")
);

export const Acta = lazy(
  () => import("pages/private/facu/consejos/components/Acta")
);

export const ListMiembros = lazy(
  () => import("pages/private/facu/consejos/components/ListMiembros")
);

export const UpdateConsejo = lazy(
  () => import("pages/private/facu/consejos/components/UpdateConsejo")
);

export const AddDocumento = lazy(
  () => import("pages/private/facu/documentos/components/AddDocumento")
);

export const DocumentosFACUOutlet = lazy(
  () => import("pages/private/facu/documentos/Documentos")
);

export const DocumentosFACU = lazy(
  () => import("pages/private/facu/documentos/components/DocumentoBase")
);

export const AddProceso = lazy(
  () => import("pages/private/facu/procesos/components/AddProceso")
);

export const AddPlantilla = lazy(
  () => import("pages/private/facu/procesos/components/AddPlantilla")
);

export const ProcesosFACUOutlet = lazy(() =>
  import("pages/private/facu/procesos/Procesos").then((m) => ({
    default: m.ProcesosOutlet,
  }))
);

export const ProcesosFACU = lazy(() =>
  import("pages/private/facu/procesos/Procesos").then((m) => ({
    default: m.Procesos,
  }))
);

export const ListPlantillas = lazy(
  () => import("pages/private/facu/procesos/components/ListPlantillas")
);

export const UpdateProceso = lazy(
  () => import("pages/private/facu/procesos/components/UpdateProceso")
);

export const UpdatePlantilla = lazy(
  () => import("pages/private/facu/procesos/components/UpdatePlantilla")
);

export const Profile = lazy(() => import("pages/private/facu/profile/Profile"));

export const AddReserva = lazy(
  () => import("pages/private/facu/documentos/components/AddReserva")
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

export const AddUsuario = lazy(
  () => import("pages/private/facu/usuarios/components/AddUsuario")
);

export const Usuarios = lazy(
  () => import("pages/private/facu/usuarios/Usuarios")
);

export const UpdateUsuario = lazy(
  () => import("pages/private/facu/usuarios/components/UpdateUsuario")
);

export const DriveTemplate = lazy(() =>
  import("components").then((module) => ({
    default: module.DriveTemplate,
  }))
);
