import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import PrivateLayout from "layout/PrivateLayout";
import Login from "pages/public/Login";
import AuthProvider from "providers/AuthProvider";
import {
    BrowserRouter, Route, Routes
} from "react-router-dom";
import PrivateRoute from "routes/PrivateRoute";
import PublicRoute from "routes/PublicRoute";

const mdTheme = createTheme({
    palette: {
        primary: {
            main: "#7a1e19",
        },
    },
});

const App = () => {
    return (
        <ThemeProvider theme={mdTheme}>
            <CssBaseline />
            <BrowserRouter>
                <AuthProvider>
                    <AppBase />
                </AuthProvider>
            </BrowserRouter>
        </ThemeProvider>
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
