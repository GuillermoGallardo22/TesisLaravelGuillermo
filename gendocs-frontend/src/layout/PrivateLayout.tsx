import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { Routes, Route, Navigate } from "react-router";
import AppBar from "./components/AppBar";
import Drawer from "./components/Drawer";
import { DEFAULT_ROUTE, routes } from "./routes";

const mdTheme = createTheme();


const PrivateLayout = () => {

    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />

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
                                    {
                                        routes.map(item => (
                                            <Route
                                                key={item.path}
                                                path={item.path}
                                                element={item.component}
                                            />
                                        ))
                                    }

                                    <Route path="/" element={<Navigate to={DEFAULT_ROUTE} />} />
                                </Routes>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default PrivateLayout;
