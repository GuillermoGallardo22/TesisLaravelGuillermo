import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import ArticleIcon from "@mui/icons-material/Article";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import HomeIcon from "@mui/icons-material/Home";
import ListIcon from "@mui/icons-material/List";
import SchoolIcon from "@mui/icons-material/School";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SecurityIcon from "@mui/icons-material/Security";

export type IconTypes =
    | "article"
    | "edit"
    | "add"
    | "move"
    //
    | "home"
    | "list"
    | "school"
    | "groupAdd"
    //
    | "exitToApp"
    | "menu"
    | "chevronLeft"
    | "expandMore"
    | "security";

const ICONS = {
    article: <ArticleIcon />,
    edit: <EditIcon />,
    add: <AddIcon />,
    move: <DriveFileMoveIcon />,
    home: <HomeIcon />,
    list: <ListIcon />,
    school: <SchoolIcon />,
    groupAdd: <GroupAddIcon />,
    exitToApp: <ExitToAppIcon />,
    menu: <MenuIcon />,
    chevronLeft: <ChevronLeftIcon />,
    expandMore: <ExpandMoreIcon />,
    security: <SecurityIcon />,
};

interface IconProps {
    icon: IconTypes;
}

const Icon: React.FC<IconProps> = ({ icon }) => ICONS[icon];

export default Icon;
