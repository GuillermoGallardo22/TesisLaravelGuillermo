import { useAuthContext } from "contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute: React.FC = ({ children }) => {
    const {
        context: { isAuth },
    } = useAuthContext();

    const location = useLocation();

    return isAuth ? (
        <>{children}</>
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    );
};

export default PrivateRoute;
