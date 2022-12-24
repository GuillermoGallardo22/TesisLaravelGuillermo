import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AdapterDateFns as DateAdapter } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import LoadingScreen from "components/LoadingScreen";
import { useAuthContext } from "contexts/AuthContext";
import esLocale from "date-fns/locale/es";
import { HTTP_STATUS } from "models/enums/HttpStatus";
import { SnackbarProvider } from "notistack";
import AuthProvider from "providers/AuthProvider";
import { lazy, Suspense, useEffect } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthActionsEnum } from "reducers/AuthReducer";
import { getUser } from "services/auth";
import { theme } from "utils/theme";

const Login = lazy(() => import("pages/public/Login"));
const PrivateLayout = lazy(() => import("layout/PrivateLayout"));
const PrivateRoute = lazy(() => import("routes/PrivateRoute"));
const PublicRoute = lazy(() => import("routes/PublicRoute"));

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={5}>
          <LocalizationProvider
            dateAdapter={DateAdapter}
            adapterLocale={esLocale}
          >
            <CssBaseline />
            <Router>
              <AuthProvider>
                <AuthCheck />
              </AuthProvider>
            </Router>
          </LocalizationProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const AuthCheck = () => {
  const {
    context: { checkingAuth },
    dispatch,
  } = useAuthContext();

  const { data } = useQuery(["me"], () => getUser());

  useEffect(() => {
    if (!data) return;

    const { status, data: user } = data;

    if (status === HTTP_STATUS.ok) {
      dispatch({ type: AuthActionsEnum.setUser, payload: user });
      dispatch({ type: AuthActionsEnum.setIsAuth, payload: true });
      dispatch({ type: AuthActionsEnum.setCheckingAuth, payload: false });
    } else {
      dispatch({ type: AuthActionsEnum.setIsAuth, payload: false });
      dispatch({ type: AuthActionsEnum.setCheckingAuth, payload: false });
    }
  }, [data]);

  return checkingAuth ? <LoadingScreen /> : <AppBase />;
};

const AppBase = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
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
          path="/*"
          element={
            <PrivateRoute>
              <PrivateLayout />
            </PrivateRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default App;
