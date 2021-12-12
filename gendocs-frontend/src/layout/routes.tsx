import HomeIcon from "@mui/icons-material/Home";
import ListIcon from "@mui/icons-material/List";
import SchoolIcon from "@mui/icons-material/School";
import Home from "pages/private/home/Home";
import AddStudents from "pages/private/student/components/AddStudents";
import ListStudents from "pages/private/student/components/ListStudents";
import UpdateStudent from "pages/private/student/components/UpdateStudent";
import Student from "pages/private/student/Student";

interface IRoute {
    path: string,
    component: React.ReactElement,
    isIndex?: boolean,
    label?: string,
    icon?: React.ReactElement,
    childrens?: IRoute[],
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
            { path: "nuevo", component: <AddStudents /> },
            { path: ":studentId", component: <UpdateStudent /> },
            { path: "", isIndex: true, component: <ListStudents /> }
        ],
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
