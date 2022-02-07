import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import PrivateLayout from "layout/PrivateLayout";
import { SnackbarProvider } from "notistack";
import Login from "pages/public/Login";
import AuthProvider from "providers/AuthProvider";
import {
    BrowserRouter as HashRouter,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";
import PrivateRoute from "routes/PrivateRoute";
import PublicRoute from "routes/PublicRoute";
import { theme } from "utils/theme";

const App = () => {
    return (
        <HashRouter>
            <SnackbarProvider maxSnack={5}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <AuthProvider>
                        <AppBase />
                    </AuthProvider>
                </ThemeProvider>
            </SnackbarProvider>
        </HashRouter>
    );
};

const AppBase = () => {
    return (
        <Routes>
            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />
            <Route
                path="/app/*"
                element={
                    <PrivateRoute>
                        <PrivateLayout />
                    </PrivateRoute>
                }
            />

            <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
    );
};

export default App;
