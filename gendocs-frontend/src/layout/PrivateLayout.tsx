import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import AccessDenied from "components/AccesDenied";
import { Skeleton } from "components/Skeleton";
import { useAuthContext } from "contexts/AuthContext";
import { Suspense, useState } from "react";
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
                                        <Route
                                            path="/"
                                            element={
                                                <Navigate to={DEFAULT_ROUTE} />
                                            }
                                        />
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

const RoleCheckerRoute = ({
    item: { roles, component: Component },
}: RoleCheckerRouteProps) => {
    const {
        context: { user },
    } = useAuthContext();

    if (!roles || roles.includes(user.roles[0])) return <Component />;

    return <AccessDenied />;
};

export default PrivateLayout;
