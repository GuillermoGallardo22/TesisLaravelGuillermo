import Icon from "components/Icon";
import { RolEnum } from "models/enums";
import { lazy } from "react";


const Home = lazy(() => import("pages/private/home/Home"));

const AddConsejo = lazy(
    () => import("pages/private/consejos/components/AddConsejo")
);

const ListConsejos = lazy(
    () => import("pages/private/consejos/components/ListConsejos")
);

const UpdateConsejo = lazy(
    () => import("pages/private/consejos/components/UpdateConsejo")
);

const Consejos = lazy(() => import("pages/private/consejos/Consejos"));

const AddDocumento = lazy(
    () => import("pages/private/documentos/components/AddDocumento")
);

const ListDocumentos = lazy(
    () => import("pages/private/documentos/components/ListDocumentos")
);

const Documentos = lazy(() => import("pages/private/documentos/Documents"));

const AddProcess = lazy(
    () => import("pages/private/processes/components/AddProcess")
);

const AddTemplates = lazy(
    () => import("pages/private/processes/components/AddTemplates")
);

const DriveTemplate = lazy(
    () => import("pages/private/processes/components/DriveTemplate")
);

const ListProcess = lazy(
    () => import("pages/private/processes/components/ListProcess")
);

const ListTemplates = lazy(
    () => import("pages/private/processes/components/ListTemplates")
);

const UpdateProcess = lazy(
    () => import("pages/private/processes/components/UpdateProcess")
);

const UpdateTemplates = lazy(
    () => import("pages/private/processes/components/UpdateTemplates")
);

const Processes = lazy(() => import("pages/private/processes/Processes"));

const Profile = lazy(() => import("pages/private/profile/Profile"));

const AddReserva = lazy(
    () => import("pages/private/reservas/components/AddReserva")
);

const ListReservas = lazy(
    () => import("pages/private/reservas/components/ListReservas")
);

const Reservas = lazy(() => import("pages/private/reservas/Reservas"));

const AddStudents = lazy(
    () => import("pages/private/student/components/AddStudents")
);

const ListStudents = lazy(
    () => import("pages/private/student/components/ListStudents")
);

const UpdateStudent = lazy(
    () => import("pages/private/student/components/UpdateStudent")
);

const Student = lazy(() => import("pages/private/student/Student"));

const AddUser = lazy(() => import("pages/private/Users/components/AddUser"));

const ListUsers = lazy(
    () => import("pages/private/Users/components/ListUsers")
);

const UpdateUser = lazy(
    () => import("pages/private/Users/components/UpdateUser")
);

const Users = lazy(() => import("pages/private/Users/Users"));
import { Outlet } from "react-router-dom";

export interface IRoute {
    path: string;
    component: React.ReactElement;
    isIndex?: boolean;
    label?: string;
    icon?: React.ReactElement;
    childrens?: IRoute[];
    roles?: RolEnum[];
}

export const DEFAULT_ROUTE = "inicio";

export const routes: IRoute[] = [
    {
        path: DEFAULT_ROUTE,
        label: "Inicio",
        component: <Home />,
        icon: <Icon icon="home" />,
    },
    {
        path: "documentos",
        label: "Documentos",
        component: <Documentos />,
        icon: <Icon icon="topic" />,
        childrens: [
            {
                path: "nuevo",
                component: <AddDocumento />,
                roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
            },
            { path: "", isIndex: true, component: <ListDocumentos /> },
        ],
    },
    {
        path: "reservas",
        label: "Reservar",
        component: <Reservas />,
        icon: <Icon icon="numbers" />,
        childrens: [
            {
                path: "nuevo",
                component: <AddReserva />,
            },
            { path: "", isIndex: true, component: <ListReservas /> },
        ],
        roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP],
    },
    {
        path: "estudiante",
        label: "Estudiantes",
        component: <Student />,
        icon: <Icon icon="school" />,
        childrens: [
            {
                path: "nuevo",
                component: <AddStudents />,
                roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
            },
            {
                path: ":studentId",
                component: <UpdateStudent />,
                roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
            },
            { path: "", isIndex: true, component: <ListStudents /> },
        ],
    },
    {
        path: "procesos",
        label: "Procesos",
        component: <Processes />,
        icon: <Icon icon="list" />,
        childrens: [
            {
                path: "nuevo",
                component: <AddProcess />,
                roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP, RolEnum.WRITER],
            },
            {
                path: ":processId",
                component: <Outlet />,
                childrens: [
                    { path: "plantillas", component: <ListTemplates /> },
                    {
                        path: "plantillas/nuevo",
                        component: <AddTemplates />,
                        roles: [
                            RolEnum.ADMIN,
                            RolEnum.ADMINTEMP,
                            RolEnum.WRITER,
                        ],
                    },
                    {
                        path: "plantillas/:templateId",
                        component: <Outlet />,
                        childrens: [
                            {
                                path: "drive",
                                isIndex: true,
                                component: <DriveTemplate />,
                            },
                            {
                                path: "",
                                isIndex: true,
                                component: <UpdateTemplates />,
                                roles: [
                                    RolEnum.ADMIN,
                                    RolEnum.ADMINTEMP,
                                    RolEnum.WRITER,
                                ],
                            },
                        ],
                    },
                    {
                        path: "",
                        isIndex: true,
                        component: <UpdateProcess />,
                        roles: [
                            RolEnum.ADMIN,
                            RolEnum.ADMINTEMP,
                            RolEnum.WRITER,
                        ],
                    },
                ],
            },
            { path: "", isIndex: true, component: <ListProcess /> },
        ],
    },
    {
        path: "consejos",
        label: "Consejos",
        component: <Consejos />,
        icon: <Icon icon="meetingRoom" />,
        childrens: [
            {
                path: "nuevo",
                component: <AddConsejo />,
                roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP],
            },
            {
                path: ":consejoId",
                component: <UpdateConsejo />,
                roles: [RolEnum.ADMIN, RolEnum.ADMINTEMP],
            },
            { path: "", isIndex: true, component: <ListConsejos /> },
        ],
    },
    {
        path: "users",
        label: "Usuarios",
        component: <Users />,
        icon: <Icon icon="groupAdd" />,
        childrens: [
            { path: "nuevo", component: <AddUser /> },
            { path: ":userId", component: <UpdateUser /> },
            { path: "", isIndex: true, component: <ListUsers /> },
        ],
        roles: [RolEnum.ADMIN],
    },
    {
        path: "profile",
        label: "Perfil",
        component: <Profile />,
        icon: <Icon icon="accountCircle" />,
    },
];
