import { useAuthContext } from "contexts/AuthContext";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute: React.FC = ({ children }) => {

    const {
        context: {
            isAuth,
        }
    } = useAuthContext();

    const location = useLocation();

    return isAuth ?
        <>
            {children}
        </> :
        (
            <Navigate
                to="/login"
                replace
                state={{ path: location.pathname }}
            />
        );

};

export default PrivateRoute;
