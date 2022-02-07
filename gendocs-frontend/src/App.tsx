import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import LoadingScreen from "components/LoadingScreen";
import { useAuthContext } from "contexts/AuthContext";
import PrivateLayout from "layout/PrivateLayout";
import { HTTP_STATUS } from "models/enums";
import { SnackbarProvider } from "notistack";
import Login from "pages/public/Login";
import AuthProvider from "providers/AuthProvider";
import { useCallback, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthActionsEnum } from "reducers/AuthReducer";
import PrivateRoute from "routes/PrivateRoute";
import PublicRoute from "routes/PublicRoute";
import { getUser } from "services/auth";
import { theme } from "utils/theme";

const App = () => {
    return (
        <Router>
            <SnackbarProvider maxSnack={5}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <AuthProvider>
                        <AuthCheck />
                    </AuthProvider>
                </ThemeProvider>
            </SnackbarProvider>
        </Router>
    );
};

const AuthCheck = () => {
    const {
        context: { checkingAuth },
        dispatch,
    } = useAuthContext();

    const checkAuth = useCallback(async () => {
        const { status, data } = await getUser();

        if (status === HTTP_STATUS.ok) {
            dispatch({ type: AuthActionsEnum.setUser, payload: data });
            dispatch({ type: AuthActionsEnum.setIsAuth, payload: true });
            dispatch({ type: AuthActionsEnum.setCheckingAuth, payload: false });
        } else {
            dispatch({ type: AuthActionsEnum.setIsAuth, payload: false });
            dispatch({ type: AuthActionsEnum.setCheckingAuth, payload: false });
        }
    }, []);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return checkingAuth ? <LoadingScreen /> : <AppBase />;
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
