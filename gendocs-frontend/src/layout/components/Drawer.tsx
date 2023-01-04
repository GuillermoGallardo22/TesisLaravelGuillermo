import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Icon from "components/Icon";
import { useRoutes } from "layout/hooks/useRoutes";
import { DRAWERWIDTH } from "utils/libs";
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
    hasCurrModule,
    hasCommModule,
    //
    sudeRoutes,
    tituRoutes,
    facuRoutes,
    currRoutes,
    commRoutes,
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

      {hasCommModule && (
        <>
          <List>
            <ListSubheader sx={{ color: "#f4511e" }} component="div" inset>
              COMUNES
            </ListSubheader>

            {commRoutes.map(
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
          <Divider />
        </>
      )}

      {hasFacuModule && (
        <>
          <List>
            <ListSubheader sx={{ color: "#512da8" }} component="div" inset>
              CONSEJO DIRECTIVO
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
          <Divider />
        </>
      )}

      {hasSudeModule && (
        <>
          <List>
            <ListSubheader sx={{ color: "#03a9f4" }} component="div" inset>
              CONSEJO ACADÉMICO
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
          <Divider />
        </>
      )}

      {hasTituModule && (
        <>
          <List>
            <ListSubheader sx={{ color: "#00796b" }} component="div" inset>
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
          <Divider />
        </>
      )}

      {hasCurrModule && (
        <>
          <List>
            <ListSubheader sx={{ color: "#ad1457" }} component="div" inset>
              INT. CURRICULAR
            </ListSubheader>

            {currRoutes.map(
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
          <Divider />
        </>
      )}
    </DrawerBase>
  );
};

export default Drawer;
