import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import { Icon } from "components";
import { useRoutes } from "layout/hooks/useRoutes";
import { DRAWERWIDTH } from "utils";
import Link from "./Link";

const drawerWidth = DRAWERWIDTH;

const DrawerBase = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    height: "100vh",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

interface DrawerProps {
  open: boolean;
  toggleDrawer: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ open, toggleDrawer }) => {
  const {
    //
    hasFacuModule,
    hasSudeModule,
    hasTituModule,
    //
    sudeRoutes,
    tituRoutes,
    facuRoutes,
  } = useRoutes();

  return (
    <DrawerBase variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <Icon icon="chevronLeft" />
        </IconButton>
      </Toolbar>
      <Divider />
      {hasFacuModule && (
        <List>
          <ListSubheader component="div" inset>
            FACULTAD
          </ListSubheader>

          {facuRoutes.map(
            (item) =>
              item.icon &&
              item.label && (
                <Link
                  key={item.path}
                  icon={<Icon icon={item.icon} />}
                  label={item.label}
                  path={item.path}
                />
              )
          )}
        </List>
      )}

      {hasSudeModule && (
        <List>
          <ListSubheader component="div" inset>
            SUBDECANATO
          </ListSubheader>

          {sudeRoutes.map(
            (item) =>
              item.icon &&
              item.label && (
                <Link
                  key={item.path}
                  icon={<Icon icon={item.icon} />}
                  label={item.label}
                  path={item.path}
                />
              )
          )}
        </List>
      )}

      {hasTituModule && (
        <List>
          <ListSubheader component="div" inset>
            TITULACIÓN
          </ListSubheader>

          {tituRoutes.map(
            (item) =>
              item.icon &&
              item.label && (
                <Link
                  key={item.path}
                  icon={<Icon icon={item.icon} />}
                  label={item.label}
                  path={item.path}
                />
              )
          )}
        </List>
      )}
    </DrawerBase>
  );
};

export default Drawer;
