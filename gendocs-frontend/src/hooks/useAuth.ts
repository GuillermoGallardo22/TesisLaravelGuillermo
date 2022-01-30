import { useAuthContext } from "contexts/AuthContext";
import { IUser } from "models/interfaces";
import { AuthActionsEnum } from "reducers/AuthReducer";

import { useFormik } from "formik";
import * as yup from "yup";
import { VALIDATION_MESSAGES } from "utils/messages";
import { useState } from "react";
import { login, logout as _logout } from "services/auth";
import { HTTP_STATUS } from "models/enums";
import { useSnackbar } from "notistack";

interface IAuth {
    email: string,
    password: string,
}

const defaultFormValues: IAuth = {
    email: "gbarcia@uta.edu.ec",
    password: "12345678",
};

const validationSchema = yup.object().shape({
    email: yup.string()
        .email(VALIDATION_MESSAGES.invalidFormat)
        .max(100, VALIDATION_MESSAGES.maxLength(100))
        .required(VALIDATION_MESSAGES.required),
    password: yup.string()
        .max(100, VALIDATION_MESSAGES.maxLength(100))
        .required(VALIDATION_MESSAGES.required),
});

export const useAuth = () => {

    const { enqueueSnackbar } = useSnackbar();

    const {
        dispatch,
    } = useAuthContext();

    const onSubmit = async (form: IAuth) => {
        const { status, message, data } = await login(form.email, form.password);

        if (status === HTTP_STATUS.ok) {
            dispatch({
                type: AuthActionsEnum.setIsAuth,
                payload: data,
            });
            dispatch({ type: AuthActionsEnum.setIsAuth, payload: true });
        } else {
            enqueueSnackbar(message, { variant: "error" });
        }
    };

    const logout = async () => {

        await _logout();

        dispatch({ type: AuthActionsEnum.setCheckingAuth, payload: true });
        dispatch({ type: AuthActionsEnum.setIsAuth, payload: false });
        dispatch({ type: AuthActionsEnum.setUser, payload: {} as IUser });
    };

    const formik = useFormik<IAuth>({
        initialValues: defaultFormValues,
        onSubmit,
        validationSchema,
    });

    return {
        formik,
        logout,
    };
};
