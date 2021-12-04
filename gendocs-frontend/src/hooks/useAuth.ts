import { useAuthContext } from "contexts/AuthContext";
import { IUser } from "models/interfaces";
import { AuthActionsEnum } from "reducers/AuthReducer";

export const useAuth = () => {

    const {
        dispatch,
    } = useAuthContext();

    const login = () => {
        setTimeout(() => {
            dispatch({
                type: AuthActionsEnum.setIsAuth, payload: {
                    id: 1,
                    name: "Juan",
                    email: "juan@gmail.com"
                }
            });
            dispatch({ type: AuthActionsEnum.setIsAuth, payload: true });
        }, 1000);
    };

    const logout = () => {
        setTimeout(() => {
            dispatch({ type: AuthActionsEnum.setCheckingAuth, payload: true });
            dispatch({ type: AuthActionsEnum.setIsAuth, payload: false });
            dispatch({ type: AuthActionsEnum.setUser, payload: {} as IUser });
        }, 500);
    };

    return {
        login,
        logout,
    };
};
