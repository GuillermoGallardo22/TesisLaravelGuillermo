import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import { AccesDenied, Skeleton } from "components";
import { useAuthContext } from "contexts/AuthContext";
import { Suspense, useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import AppBar from "./components/AppBar";
import Drawer from "./components/Drawer";
import { DEFAULT_ROUTE, IRoute, routes } from "./routes";

const handleRoutes = (item: IRoute) => {
  return (
    <Route
      key={item.path}
      path={item.path}
      index={Boolean(item.isIndex)}
      element={<RoleCheckerRoute item={item} />}
    >
      {item.childrens?.map(handleRoutes)}
    </Route>
  );
};

const isToogleDrawer = localStorage.getItem("isToogleDrawer") || "true";
const defaultState = JSON.parse(isToogleDrawer);

const PrivateLayout = () => {
  const [open, setOpen] = useState(defaultState);

  const {
    context: { user },
  } = useAuthContext();

  const toggleDrawer = () => {
    const state = !open;
    localStorage.setItem("isToogleDrawer", JSON.stringify(state));
    setOpen(state);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar open={open} toggleDrawer={toggleDrawer} />
      <Drawer open={open} toggleDrawer={toggleDrawer} />

      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Grid container>
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Suspense fallback={<Skeleton />}>
                  <Routes>
                    {routes.map(handleRoutes)}
                    <Route path="/" element={<Navigate to={DEFAULT_ROUTE} />} />
                  </Routes>
                </Suspense>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

interface RoleCheckerRouteProps {
  item: IRoute;
}

// TODO: improve re-rendering of routes dur to poor performance when toogle drawer
const RoleCheckerRoute = ({
  item: { roles = [], component: Component, modules = [] },
}: RoleCheckerRouteProps) => {
  const {
    context: { user },
  } = useAuthContext();

  const hasEnoughRoles = useMemo(
    () => !roles.length || roles.some((role) => user.roles.includes(role)),
    []
  );

  const hasAccessToModule = useMemo(
    () =>
      !modules.length ||
      modules.some((module) =>
        user.modulos.map((us) => us.code).includes(module)
      ),
    []
  );

  if (hasEnoughRoles && hasAccessToModule) return <Component />;

  return <AccesDenied />;
};

export default PrivateLayout;
