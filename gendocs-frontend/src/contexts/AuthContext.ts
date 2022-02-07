import { IUser } from "models/interfaces";
import { createContext, useContext } from "react";
import { AuthActionsProps, AuthReducerState } from "reducers/AuthReducer";

interface AuthContextProps {
    context: AuthReducerState;
    dispatch: (action: AuthActionsProps) => void;
}

export const initialState: AuthReducerState = {
    isAuth: false,
    checkingAuth: true,
    user: {} as IUser,
};

export const AuthContext = createContext<AuthContextProps>({
    dispatch: () => {
        //
    },
    context: initialState,
});

export const useAuthContext = (): AuthContextProps => useContext(AuthContext);
