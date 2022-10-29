import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import AccessDenied from "components/AccesDenied";
import Skeleton from "components/Skeleton";
import { useAuthContext } from "contexts/AuthContext";
import { LocalStorageKeys } from "models/enums/LocalStorageKeys";
import { IRoute } from "models/interfaces/IRoute";
import { Suspense, useCallback, useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import AppBar from "./components/AppBar";
import Drawer from "./components/Drawer";
import { allRoutes as routes, getDefaultRoutes } from "./routes/";

const isToogleDrawer =
  localStorage.getItem(LocalStorageKeys.IS_TOOGLE_DRAWER) || "true";

const defaultState = Boolean(JSON.parse(isToogleDrawer));

const PrivateLayout = () => {
  const [open, setOpen] = useState(defaultState);

  const {
    context: { user },
  } = useAuthContext();

  const toggleDrawer = () => {
    const state = !open;
    localStorage.setItem(
      LocalStorageKeys.IS_TOOGLE_DRAWER,
      JSON.stringify(state)
    );
    setOpen(state);
  };

  const DEFAULT_ROUTE = useMemo(() => getDefaultRoutes(user.modulos), []);

  const handleRoute = useCallback((item: IRoute) => {
    const {
      roles = [],
      modules = [],
      childrens = [],
      component: TargetComponent,
    } = item;

    const hasEnoughRoles =
      !roles.length || roles.some((role) => user.roles.includes(role));

    const hasAccessToModule =
      !modules.length ||
      modules.some((module) =>
        user.modulos.map((m) => m.code).includes(module)
      );

    const canAccess = hasEnoughRoles && hasAccessToModule;

    return (
      <Route
        key={item.path}
        path={item.path}
        index={Boolean(item.isIndex)}
        element={canAccess ? <TargetComponent /> : <AccessDenied />}
      >
        {childrens.map(handleRoute)}
      </Route>
    );
  }, []);

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
                    {routes.map(handleRoute)}
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

export default PrivateLayout;
