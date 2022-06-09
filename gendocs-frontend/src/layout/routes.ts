import { IconTypes, Outlet } from "components";
import { ModuleEnum, RolEnum } from "models/enums";
import {
  Acta,
  AddCarrera,
  AddConsejo,
  AddDocente,
  AddDocumento,
  AddEstudiante,
  AddPlantilla,
  AddProceso,
  AddReserva,
  AddUsuario,
  Carreras,
  Consejos,
  Docentes,
  DocumentosFACU,
  DocumentosFACUOutlet,
  DriveTemplate,
  Estudiantes,
  Home,
  ListMiembros,
  ListPlantillas,
  ListResoluciones,
  ProcesosFACU,
  ProcesosFACUOutlet,
  ProcesosSUDE,
  ProcesosSUDEOutlet,
  Profile,
  UpdateCarrera,
  UpdateConsejo,
  UpdateDocente,
  UpdateEstudiante,
  UpdatePlantilla,
  UpdateProceso,
  UpdateUsuario,
  Usuarios,
} from "./components";

export interface IRoute {
  path: string;
  component: React.FunctionComponent;
  isIndex?: boolean;
  label?: string;
  icon?: IconTypes;
  childrens?: IRoute[];
  roles?: RolEnum[];
  modules?: ModuleEnum[];
  isMenuOption?: boolean;
}

export const DEFAULT_ROUTE = "inicio";

export const routes: IRoute[] = [
  // SUDE
  {
    path: "procesos-sude",
    label: "Procesos",
    component: ProcesosSUDEOutlet,
    icon: "list",
    modules: [ModuleEnum.SUDE],
    isMenuOption: true,
    childrens: [
      {
        path: "nuevo",
        component: AddProceso,
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
      },
      {
        path: ":processId",
        component: Outlet,
        childrens: [
          {
            path: "plantillas",
            component: Outlet,
            childrens: [
              {
                path: "nuevo",
                component: AddPlantilla,
                roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
              },
              {
                path: ":templateId",
                component: Outlet,
                childrens: [
                  {
                    path: "drive/:driveId",
                    component: DriveTemplate,
                  },
                  {
                    path: "",
                    isIndex: true,
                    component: UpdatePlantilla,
                    roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
                  },
                ],
              },
              {
                path: "",
                label: "",
                isIndex: true,
                component: ListPlantillas,
              },
            ],
          },
          {
            path: "",
            isIndex: true,
            component: UpdateProceso,
            roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
          },
        ],
      },
      { path: "", isIndex: true, component: ProcesosSUDE },
    ],
  },
  // FACU
  {
    path: DEFAULT_ROUTE,
    label: "Inicio",
    component: Outlet,
    icon: "home",
    modules: [ModuleEnum.FACU],
    isMenuOption: true,
    childrens: [
      {
        path: "drive/:driveId",
        component: DriveTemplate,
      },
      {
        path: "",
        isIndex: true,
        component: Home,
      },
    ],
  },
  {
    path: "documentos",
    label: "Documentos",
    component: DocumentosFACUOutlet,
    icon: "topic",
    modules: [ModuleEnum.FACU],
    isMenuOption: true,
    childrens: [
      {
        path: "nuevo",
        component: AddDocumento,
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
      },
      {
        path: "reservar",
        component: AddReserva,
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP],
      },
      {
        path: "drive/:driveId",
        component: DriveTemplate,
      },
      { path: "", isIndex: true, component: DocumentosFACU },
    ],
  },
  {
    path: "carreras",
    label: "Carreras",
    component: Outlet,
    icon: "apartment",
    modules: [ModuleEnum.FACU],
    isMenuOption: true,
    childrens: [
      {
        path: "nuevo",
        component: AddCarrera,
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP],
      },
      {
        path: ":carreraId",
        component: UpdateCarrera,
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP],
      },
      { path: "", isIndex: true, component: Carreras },
    ],
  },
  {
    path: "docentes",
    label: "Docentes",
    component: Outlet,
    icon: "hail",
    modules: [ModuleEnum.FACU],
    isMenuOption: true,
    childrens: [
      {
        path: "nuevo",
        component: AddDocente,
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
      },
      {
        path: ":docenteId",
        component: UpdateDocente,
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
      },
      { path: "", isIndex: true, component: Docentes },
    ],
  },
  {
    path: "estudiantes",
    label: "Estudiantes",
    component: Outlet,
    icon: "school",
    modules: [ModuleEnum.FACU],
    isMenuOption: true,
    childrens: [
      {
        path: "nuevo",
        component: AddEstudiante,
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
      },
      {
        path: ":studentId",
        component: UpdateEstudiante,
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
      },
      { path: "", isIndex: true, component: Estudiantes },
    ],
  },
  {
    path: "procesos",
    label: "Procesos",
    component: ProcesosFACUOutlet,
    icon: "list",
    modules: [ModuleEnum.FACU],
    isMenuOption: true,
    childrens: [
      {
        path: "nuevo",
        component: AddProceso,
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
      },
      {
        path: ":processId",
        component: Outlet,
        childrens: [
          {
            path: "plantillas",
            component: Outlet,
            childrens: [
              {
                path: "nuevo",
                component: AddPlantilla,
                roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
              },
              {
                path: ":templateId",
                component: Outlet,
                childrens: [
                  {
                    path: "drive/:driveId",
                    component: DriveTemplate,
                  },
                  {
                    path: "",
                    isIndex: true,
                    component: UpdatePlantilla,
                    roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
                  },
                ],
              },
              {
                path: "",
                label: "",
                isIndex: true,
                component: ListPlantillas,
              },
            ],
          },
          {
            path: "",
            isIndex: true,
            component: UpdateProceso,
            roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
          },
        ],
      },
      { path: "", isIndex: true, component: ProcesosFACU },
    ],
  },
  {
    path: "consejos",
    label: "Consejos",
    component: Outlet,
    icon: "meetingRoom",
    modules: [ModuleEnum.FACU],
    childrens: [
      {
        path: "nuevo",
        component: AddConsejo,
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP],
      },
      {
        path: "plantilla-acta/:driveId",
        component: DriveTemplate,
      },
      {
        path: "plantilla-separador/:driveId",
        component: DriveTemplate,
      },
      {
        path: ":consejoId",
        component: Outlet,
        childrens: [
          {
            path: "asistencia",
            component: ListMiembros,
            roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP],
          },
          {
            path: "acta",
            component: Outlet,
            roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP],
            childrens: [
              {
                path: "drive/:driveId",
                component: DriveTemplate,
              },
              {
                path: "",
                component: Acta,
                isIndex: true,
              },
            ],
          },
          {
            path: "resoluciones",
            component: Outlet,
            childrens: [
              {
                path: "drive/:driveId",
                component: DriveTemplate,
              },
              {
                path: "",
                isIndex: true,
                component: ListResoluciones,
              },
            ],
          },
          {
            path: "",
            isIndex: true,
            component: UpdateConsejo,
            roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP],
          },
        ],
      },
      { path: "", isIndex: true, component: Consejos },
    ],
    isMenuOption: true,
  },
  {
    path: "usuarios",
    label: "Usuarios",
    component: Outlet,
    icon: "groupAdd",
    modules: [ModuleEnum.FACU],
    isMenuOption: true,
    roles: [RolEnum.ADMIN],
    childrens: [
      { path: "nuevo", component: AddUsuario },
      { path: ":userId", component: UpdateUsuario },
      { path: "", isIndex: true, component: Usuarios },
    ],
  },
  {
    path: "profile",
    label: "Perfil",
    component: Profile,
    icon: "accountCircle",
    modules: [ModuleEnum.FACU, ModuleEnum.SUDE, ModuleEnum.TITU],
  },
];

export function getFacuRoutes(userRoles: RolEnum[], userModules: ModuleEnum[]) {
  return routes
    .filter((route) =>
      route.modules?.some((module) => module === ModuleEnum.FACU)
    )
    .filter((r) => r.isMenuOption)
    .filter((route) =>
      route.modules?.map((module) =>
        userModules.map((module2) => module === module2)
      )
    )
    .filter(
      (route) =>
        !route.roles ||
        route.roles.some((role) => userRoles.some((role2) => role2 === role))
    );
}

export function getSudeRoutes(userRoles: RolEnum[], userModules: ModuleEnum[]) {
  return routes
    .filter((route) =>
      route.modules?.some((module) => module === ModuleEnum.SUDE)
    )
    .filter((r) => r.isMenuOption)
    .filter((route) =>
      route.modules?.map((module) =>
        userModules.map((module2) => module === module2)
      )
    )
    .filter(
      (route) =>
        !route.roles ||
        route.roles.some((role) => userRoles.some((role2) => role2 === role))
    );
}

export function getTituRoutes(userRoles: RolEnum[], userModules: ModuleEnum[]) {
  return routes
    .filter((route) =>
      route.modules?.some((module) => module === ModuleEnum.TITU)
    )
    .filter((r) => r.isMenuOption)
    .filter((route) =>
      route.modules?.map((module) =>
        userModules.map((module2) => module === module2)
      )
    )
    .filter(
      (route) =>
        !route.roles ||
        route.roles.some((role) => userRoles.some((role2) => role2 === role))
    );
}
