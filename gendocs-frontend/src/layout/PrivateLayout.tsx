import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { Navigate, Route, Routes } from "react-router";
import AppBar from "./components/AppBar";
import Drawer from "./components/Drawer";
import { DEFAULT_ROUTE, IRoute, routes } from "./routes";

const PrivateLayout = () => {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const route = (item: IRoute, index: number) => {
        return (
            <Route
                key={index}
                path={item.path}
                index={item.isIndex}
                element={item.component}
            >
                {item.childrens?.map(route)}
            </Route>
        );
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
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3}>
                        {/* Recent Orders */}
                        <Grid item xs={12}>
                            <Routes>
                                {routes.map(route)}
                                <Route
                                    path="/"
                                    element={<Navigate to={DEFAULT_ROUTE} />}
                                />
                            </Routes>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
};

export default PrivateLayout;
