import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link as RouterLink } from "react-router-dom";

interface LinkProps {
  path: string;
  label: string;
  icon: React.ReactElement;
}

const Link: React.FC<LinkProps> = ({ path, label, icon }) => {
  return (
    <ListItem button to={path} component={RouterLink}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  );
};

export default Link;
