import LoadingScreen from "components/LoadingScreen";
import { useAuthContext } from "contexts/AuthContext";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthActionsEnum } from "reducers/AuthReducer";

const PublicRoute: React.FC = ({ children }) => {

    const {
        context: {
            isAuth,
            checkingAuth,
        },
        dispatch,
    } = useAuthContext();

    useEffect(() => {
        setTimeout(() => {
            dispatch({ type: AuthActionsEnum.setIsAuth, payload: false });
            dispatch({ type: AuthActionsEnum.setCheckingAuth, payload: false });
        }, 3000);
    }, []);

    return checkingAuth ? (
        <LoadingScreen />
    ) : !isAuth ?
        <>
            {children}
        </> :
        (
            <Navigate to="/" />
        );
};

export default PublicRoute;
