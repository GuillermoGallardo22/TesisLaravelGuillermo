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
     //TITULACION
     hasSistModule,
     hasInpaModule,
     hasElecModule,
     //TITULACION
     //INTEGRACION CURRICULAR
     hasSoftModule,
     hasTeciModule,
     hasTeleModule,
     hasIndsModule,
     //INTEGRACION CURRICULAR
    hasTituModule,
    hasCurrModule,
    hasCommModule,
    //
    sudeRoutes,
     //TITULACION
     sistRoutes,
     inpaRoutes,
     elecRoutes,
     //TITULACION
     //INTEGRACION CURRICULAR
     softRoutes,
     teciRoutes,
     teleRoutes,
     indsRoutes,
     //INTEGRACION CURRICULAR
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

{hasSistModule && (
        <List>
         <ListSubheader component="div" sx={{ color: "#330ABB" }} inset>
                 **TITULACIÓN** 
          </ListSubheader>
            <ListSubheader sx={{ color: "#C32121" }} component="div" inset>
            Sistemas
            </ListSubheader>

          {sistRoutes.map(
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
          <Divider />

        </List>
      )}

{hasInpaModule && (
        <List>
          <ListSubheader component="div" sx={{ color: "#12972C" }} inset>
            Industrial Proc. Auto.
          </ListSubheader>

          {inpaRoutes.map(
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
          <Divider />

        </List>
      )}

      
{hasElecModule && (
        <List>
          <ListSubheader component="div" sx={{ color: "#2195C3" }} inset>
           Electrónica Comu.
          </ListSubheader>
          {elecRoutes.map(
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
          <Divider />

        </List>
      )}


{hasSoftModule && (
        <List>
              <ListSubheader component="div" sx={{ color: "#330ABB" }} inset>
          **INT. CURRICULAR**
          </ListSubheader>
          <ListSubheader component="div" sx={{ color: "#C32121" }} inset>
           Software
          </ListSubheader>
          {/* <ListSubheader component="div" sx={{ color: "#C32121" }} inset>
          **INT. CURRICULAR**
        <br></br>
           Software
          </ListSubheader> */}

          {softRoutes.map(
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
          <Divider />

        </List>
      )}


  
{hasTeciModule && (
        <List>
          <ListSubheader component="div" sx={{ color: "#C32121" }} inset>
           Tecnologías Infor.
          </ListSubheader>

          {teciRoutes.map(
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
          <Divider />

        </List>
      )}    

{hasTeleModule && (
        <List>
          {/* , background: "#2195C3" */}
          <ListSubheader component="div" sx={{ color: "#2195C3"}} inset>
           Telecomunicaciones
          </ListSubheader>

          {teleRoutes.map(
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
          <Divider />

        </List>
      )}    

{hasIndsModule && (
        <List>
          <ListSubheader component="div" sx={{ color: "#12972C" }}  inset>
          Industrial
          </ListSubheader>

          {indsRoutes.map(
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
