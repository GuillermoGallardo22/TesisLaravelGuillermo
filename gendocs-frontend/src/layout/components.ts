import { lazy } from "react";

export const AddDocente = lazy(
    () => import("pages/private/docentes/components/AddDocente")
);

export const UpdateDocente = lazy(
    () => import("pages/private/docentes/components/UpdateDocente")
);

export const ListDocentes = lazy(
    () => import("pages/private/docentes/components/ListDocentes")
);

export const AddCarrera = lazy(
    () => import("pages/private/carreras/components/AddCarrera")
);

export const ListCarreras = lazy(
    () => import("pages/private/carreras/components/ListCarreras")
);

export const UpdateCarrera = lazy(
    () => import("pages/private/carreras/components/UpdateCarrera")
);

export const Home = lazy(() => import("pages/private/home/Home"));

export const AddConsejo = lazy(
    () => import("pages/private/consejos/components/AddConsejo")
);

export const ListConsejos = lazy(
    () => import("pages/private/consejos/components/ListConsejos")
);

export const UpdateConsejo = lazy(
    () => import("pages/private/consejos/components/UpdateConsejo")
);

export const AddDocumento = lazy(
    () => import("pages/private/documentos/components/AddDocumento")
);

export const ListDocumentos = lazy(
    () => import("pages/private/documentos/components/ListDocumentos")
);

export const AddProcess = lazy(
    () => import("pages/private/processes/components/AddProcess")
);

export const AddTemplates = lazy(
    () => import("pages/private/processes/components/AddTemplates")
);

export const ListProcess = lazy(
    () => import("pages/private/processes/components/ListProcess")
);

export const ListTemplates = lazy(
    () => import("pages/private/processes/components/ListTemplates")
);

export const UpdateProcess = lazy(
    () => import("pages/private/processes/components/UpdateProcess")
);

export const UpdateTemplates = lazy(
    () => import("pages/private/processes/components/UpdateTemplates")
);

export const Profile = lazy(() => import("pages/private/profile/Profile"));

export const AddReserva = lazy(
    () => import("pages/private/reservas/components/AddReserva")
);

export const ListReservas = lazy(
    () => import("pages/private/reservas/components/ListReservas")
);

export const AddStudents = lazy(
    () => import("pages/private/student/components/AddStudents")
);

export const ListStudents = lazy(
    () => import("pages/private/student/components/ListStudents")
);

export const UpdateStudent = lazy(
    () => import("pages/private/student/components/UpdateStudent")
);

export const AddUser = lazy(
    () => import("pages/private/Users/components/AddUser")
);

export const ListUsers = lazy(
    () => import("pages/private/Users/components/ListUsers")
);

export const UpdateUser = lazy(
    () => import("pages/private/Users/components/UpdateUser")
);

export const DriveTemplate = lazy(() => import("components/DriveTemplate"));
