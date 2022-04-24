import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArticleIcon from "@mui/icons-material/Article";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupsIcon from "@mui/icons-material/Groups";
import HailIcon from "@mui/icons-material/Hail";
import HomeIcon from "@mui/icons-material/Home";
import ListIcon from "@mui/icons-material/List";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import MenuIcon from "@mui/icons-material/Menu";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import NumbersIcon from "@mui/icons-material/Numbers";
import SchoolIcon from "@mui/icons-material/School";
import SecurityIcon from "@mui/icons-material/Security";
import SettingsIcon from "@mui/icons-material/Settings";
import TopicIcon from "@mui/icons-material/Topic";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { SvgIcon } from "@mui/material";
import { forwardRef } from "react";

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
  | "hail"
  | "factCheck"
  | "menuBook"
  | "download"
  | "arrowBack"
  | "settings";

const ICONS = {
  article: ArticleIcon,
  edit: EditIcon,
  add: AddIcon,
  move: DriveFileMoveIcon,
  home: HomeIcon,
  list: ListIcon,
  school: SchoolIcon,
  groupAdd: GroupAddIcon,
  exitToApp: ExitToAppIcon,
  menu: MenuIcon,
  chevronLeft: ChevronLeftIcon,
  expandMore: ExpandMoreIcon,
  security: SecurityIcon,
  groups: GroupsIcon,
  meetingRoom: MeetingRoomIcon,
  delete: DeleteIcon,
  accountCircle: AccountCircleIcon,
  topic: TopicIcon,
  autorenew: AutorenewIcon,
  numbers: NumbersIcon,
  whatsApp: WhatsAppIcon,
  email: EmailIcon,
  apartment: ApartmentIcon,
  hail: HailIcon,
  factCheck: FactCheckIcon,
  menuBook: MenuBookIcon,
  download: DownloadIcon,
  arrowBack: ArrowBackIcon,
  settings: SettingsIcon,
};

interface IconProps {
  icon: IconTypes;
}

const Icon = forwardRef<any, IconProps>(({ icon, ...props }, ref) => (
  <SvgIcon ref={ref} {...props} component={ICONS[icon]} />
));

Icon.displayName = "Custom-Icon-Component";

export default Icon;
