import { useAuthContext } from "contexts/AuthContext";
import { IUser } from "models/interfaces";
import { AuthActionsEnum } from "reducers/AuthReducer";

import { useFormik } from "formik";
import * as yup from "yup";
import { VALIDATION_MESSAGES } from "utils/messages";
import { useState } from "react";

interface IAuth {
    email: string,
    password: string,
}

const defaultFormValues: IAuth = {
    email: "gbarcia@uta.edu.ec",
    password: "123456",
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

    const {
        dispatch,
    } = useAuthContext();

    const [submitting, setSubmitting] = useState(false);

    const onSubmit = (form: IAuth) => {
        setSubmitting(true);

        setTimeout(() => {

            dispatch({
                type: AuthActionsEnum.setIsAuth, payload: {
                    id: 1,
                    name: "Juan",
                    email: form.email,
                }
            });
            dispatch({ type: AuthActionsEnum.setIsAuth, payload: true });

            setSubmitting(false);
        }, 1000);
    };

    const logout = () => {
        setTimeout(() => {
            dispatch({ type: AuthActionsEnum.setCheckingAuth, payload: true });
            dispatch({ type: AuthActionsEnum.setIsAuth, payload: false });
            dispatch({ type: AuthActionsEnum.setUser, payload: {} as IUser });
        }, 500);
    };

    const formik = useFormik<IAuth>({
        initialValues: defaultFormValues,
        onSubmit,
        validationSchema,
    });

    return {
        formik,
        logout,
        submitting,
    };
};
