import { useAuthContext } from "contexts/AuthContext";
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute: React.FC = ({ children }) => {

    const {
        context: {
            isAuth,
        }
    } = useAuthContext();

    return isAuth ?
        <>
            {children}
        </> :
        (
            <Navigate to="/login" />
        );

};

export default PrivateRoute;
