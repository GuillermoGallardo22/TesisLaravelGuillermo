import { AuthContext, initialState } from "contexts/AuthContext";
import React, { useReducer } from "react";
import { authReducer } from "reducers/AuthReducer";

const AuthProvider: React.FC = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, initialState);

    return (
        <AuthContext.Provider value={{ context: state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
