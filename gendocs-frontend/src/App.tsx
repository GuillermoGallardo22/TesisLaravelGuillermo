import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import PrivateLayout from "layout/PrivateLayout";
import { SnackbarProvider } from "notistack";
import Login from "pages/public/Login";
import AuthProvider from "providers/AuthProvider";
import {
    HashRouter, Route, Routes
} from "react-router-dom";
import PrivateRoute from "routes/PrivateRoute";
import PublicRoute from "routes/PublicRoute";
import { initAxios } from "utils/axios";
import { theme } from "utils/theme";

initAxios();

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
            <Route path="/login" element={<PublicRoute>
                <Login />
            </PublicRoute>} />
            <Route path="/*" element={<PrivateRoute>
                <PrivateLayout />
            </PrivateRoute>} />
        </Routes>
    );
};

export default App;
