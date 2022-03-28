import { lazy } from "react";

export const AddDocente = lazy(
    () => import("pages/private/docentes/components/AddDocente")
);

export const UpdateDocente = lazy(
    () => import("pages/private/docentes/components/UpdateDocente")
);

export const Docentes = lazy(() => import("pages/private/docentes/Docentes"));

export const AddCarrera = lazy(
    () => import("pages/private/carreras/components/AddCarrera")
);

export const Carreras = lazy(() => import("pages/private/carreras/Carreras"));

export const UpdateCarrera = lazy(
    () => import("pages/private/carreras/components/UpdateCarrera")
);

export const Home = lazy(() => import("pages/private/home/Home"));

export const AddConsejo = lazy(
    () => import("pages/private/consejos/components/AddConsejo")
);

export const Consejos = lazy(() => import("pages/private/consejos/Consejos"));

export const ListMiembros = lazy(
    () => import("pages/private/consejos/components/ListMiembros")
);

export const UpdateConsejo = lazy(
    () => import("pages/private/consejos/components/UpdateConsejo")
);

export const AddDocumento = lazy(
    () => import("pages/private/documentos/components/AddDocumento")
);

export const Documentos = lazy(
    () => import("pages/private/documentos/Documentos")
);

export const AddProceso = lazy(
    () => import("pages/private/procesos/components/AddProceso")
);

export const AddPlantilla = lazy(
    () => import("pages/private/procesos/components/AddPlantilla")
);

export const Procesos = lazy(() => import("pages/private/procesos/Procesos"));

export const ListPlantillas = lazy(
    () => import("pages/private/procesos/components/ListPlantillas")
);

export const UpdateProceso = lazy(
    () => import("pages/private/procesos/components/UpdateProceso")
);

export const UpdatePlantilla = lazy(
    () => import("pages/private/procesos/components/UpdatePlantilla")
);

export const Profile = lazy(() => import("pages/private/profile/Profile"));

export const AddReserva = lazy(
    () => import("pages/private/documentos/components/AddReserva")
);

export const AddEstudiante = lazy(
    () => import("pages/private/estudiantes/components/AddEstudiante")
);

export const Estudiantes = lazy(
    () => import("pages/private/estudiantes/Estudiantes")
);

export const UpdateEstudiante = lazy(
    () => import("pages/private/estudiantes/components/UpdateEstudiante")
);

export const AddUsuario = lazy(
    () => import("pages/private/usuarios/components/AddUsuario")
);

export const Usuarios = lazy(() => import("pages/private/usuarios/Usuarios"));

export const UpdateUsuario = lazy(
    () => import("pages/private/usuarios/components/UpdateUsuario")
);

export const DriveTemplate = lazy(() =>
    import("components").then((module) => ({
        default: module.DriveTemplate,
    }))
);
