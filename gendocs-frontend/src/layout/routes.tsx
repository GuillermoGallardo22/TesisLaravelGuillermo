import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import Home from "pages/private/home/Home";
import Student from "pages/private/student/Student";
import ListIcon from "@mui/icons-material/List";

interface IRoute {
    path: string,
    label: string,
    component: React.ReactElement,
    icon: React.ReactElement,
}

export const DEFAULT_ROUTE = "home";

export const routes: IRoute[] = [
    {
        path: "home",
        label: "Inicio",
        component: <Home />,
        icon: <HomeIcon />,
    },
    {
        path: "estudiantes",
        label: "Estudiantes",
        component: <Student />,
        icon: <SchoolIcon />,
    },
    {
        path: "procesos",
        label: "Procesos",
        component: <Student />,
        icon: <ListIcon />,
    },
    {
        path: "consejos",
        label: "Consejos",
        component: <Student />,
        icon: <SchoolIcon />,
    },
];
