import { lazy } from "react";
//estudiante

export const AddEstudiante = lazy(
  () => import("pages/private/facu/estudiantes/components/AddEstudiante")
);

export const Estudiantes = lazy(
  () => import("pages/private/facu/estudiantes/Estudiantes")
);

export const UpdateEstudiante = lazy(
  () => import("pages/private/facu/estudiantes/components/UpdateEstudiante")
);

