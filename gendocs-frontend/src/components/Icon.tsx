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
import GroupsIcon from "@mui/icons-material/Groups";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TopicIcon from "@mui/icons-material/Topic";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import NumbersIcon from "@mui/icons-material/Numbers";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import ApartmentIcon from "@mui/icons-material/Apartment";
import HailIcon from "@mui/icons-material/Hail";

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
    | "security"
    | "groups"
    | "meetingRoom"
    | "delete"
    | "accountCircle"
    | "topic"
    | "autorenew"
    | "numbers"
    | "whatsApp"
    | "email"
    | "apartment"
    | "hail";

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
    groups: <GroupsIcon />,
    meetingRoom: <MeetingRoomIcon />,
    delete: <DeleteIcon />,
    accountCircle: <AccountCircleIcon />,
    topic: <TopicIcon />,
    autorenew: <AutorenewIcon />,
    numbers: <NumbersIcon />,
    whatsApp: <WhatsAppIcon />,
    email: <EmailIcon />,
    apartment: <ApartmentIcon />,
    hail: <HailIcon />,
};

interface IconProps {
    icon: IconTypes;
}

const Icon: React.FC<IconProps> = ({ icon }) => ICONS[icon];

export default Icon;
