import PrivateLayout from "layout/PrivateLayout";
import Login from "pages/public/Login";
import AuthProvider from "providers/AuthProvider";
import {
    BrowserRouter, Route, Routes
} from "react-router-dom";
import PrivateRoute from "routes/PrivateRoute";
import PublicRoute from "routes/PublicRoute";

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppBase />
            </AuthProvider>
        </BrowserRouter>
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
