import LoadingScreen from "components/LoadingScreen";
import { useAuthContext } from "contexts/AuthContext";
import { HTTP_STATUS } from "models/enums";
import { useCallback, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthActionsEnum } from "reducers/AuthReducer";
import { getUser } from "services/auth";

type IState = {
    path?: string;
};

const PublicRoute: React.FC = ({ children }) => {
    const {
        context: { isAuth, checkingAuth },
        dispatch,
    } = useAuthContext();

    const { state } = useLocation();
    const navigate = useNavigate();

    const _checkAuth = useCallback(async () => {
        const { status, data } = await getUser();

        if (status === HTTP_STATUS.ok) {
            navigate((state as IState)?.path || "/", { replace: true });
            dispatch({ type: AuthActionsEnum.setUser, payload: data });
            dispatch({ type: AuthActionsEnum.setIsAuth, payload: true });
            dispatch({ type: AuthActionsEnum.setCheckingAuth, payload: false });
        } else {
            dispatch({ type: AuthActionsEnum.setCheckingAuth, payload: false });
            dispatch({ type: AuthActionsEnum.setIsAuth, payload: false });
        }
    }, []);

    useEffect(() => {
        _checkAuth();
    }, []);

    return checkingAuth ? (
        <LoadingScreen />
    ) : !isAuth ? (
        <>{children}</>
    ) : (
        <Navigate to="/app/" />
    );
};

export default PublicRoute;
