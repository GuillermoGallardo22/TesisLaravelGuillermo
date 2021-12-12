import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import PrivateLayout from "layout/PrivateLayout";
import Login from "pages/public/Login";
import AuthProvider from "providers/AuthProvider";
import {
    HashRouter, Route, Routes
} from "react-router-dom";
import PrivateRoute from "routes/PrivateRoute";
import PublicRoute from "routes/PublicRoute";
import { theme } from "utils/theme";

const App = () => {
    return (
        <HashRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AuthProvider>
                    <AppBase />
                </AuthProvider>
            </ThemeProvider>
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
