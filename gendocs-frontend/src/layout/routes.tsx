import HomeIcon from "@mui/icons-material/Home";
import ListIcon from "@mui/icons-material/List";
import SchoolIcon from "@mui/icons-material/School";
import Home from "pages/private/home/Home";
import AddProcess from "pages/private/processes/components/AddProcess";
import AddTemplates from "pages/private/processes/components/AddTemplates";
import DriveTemplate from "pages/private/processes/components/DriveTemplate";
import ListProcess from "pages/private/processes/components/ListProcess";
import ListTemplates from "pages/private/processes/components/ListTemplates";
import UpdateProcess from "pages/private/processes/components/UpdateProcess";
import UpdateTemplates from "pages/private/processes/components/UpdateTemplates";
import Processes from "pages/private/processes/Processes";
import AddStudents from "pages/private/student/components/AddStudents";
import ListStudents from "pages/private/student/components/ListStudents";
import UpdateStudent from "pages/private/student/components/UpdateStudent";
import Student from "pages/private/student/Student";
import Users from "pages/private/Users/Users";
import { Outlet } from "react-router-dom";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddUser from "pages/private/Users/components/AddUser";
import ListUsers from "pages/private/Users/components/ListUsers";
import { RolEnum } from "models/enums";
import UpdateUser from "pages/private/Users/components/UpdateUser";

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
        icon: <HomeIcon />,
    },
    {
        path: "estudiante",
        label: "Estudiantes",
        component: <Student />,
        icon: <SchoolIcon />,
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
        icon: <ListIcon />,
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
        component: <Student />,
        icon: <SchoolIcon />,
    },
    {
        path: "users",
        label: "Usuarios",
        component: <Users />,
        icon: <GroupAddIcon />,
        childrens: [
            { path: "nuevo", component: <AddUser /> },
            { path: ":userId", component: <UpdateUser /> },
            { path: "", isIndex: true, component: <ListUsers /> },
        ],
        roles: [RolEnum.ADMIN],
    },
];
