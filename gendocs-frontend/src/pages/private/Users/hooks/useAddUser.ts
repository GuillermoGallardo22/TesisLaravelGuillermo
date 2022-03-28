import { useFormik } from "formik";
import { HTTP_STATUS } from "models/enums";
import { IRole, IUserForm } from "models/interfaces";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { createUser, getRoles } from "services";
import { CONSTANTS } from "utils/constants";
import { VALIDATION_MESSAGES } from "utils/messages";

import * as yup from "yup";

const initialValues: IUserForm = {
    correo_principal: "",
    nombre: "",
    correo_secundario: "",
    id: -1,
    rol: -1,
};

export const useAddUser = () => {
    const [roles, setRoles] = useState<IRole[]>([]);
    const { enqueueSnackbar } = useSnackbar();
    const [errors, setErrors] = useState<string[] | undefined>();

    const loadInitData = useCallback(() => {
        getRoles().then((r) => setRoles(r));
    }, []);

    useEffect(() => {
        loadInitData();
    }, []);

    const onSubmit = async (form: IUserForm): Promise<void> => {
        setErrors(undefined);

        const { status, message, errors } = await createUser(form);

        if (status === HTTP_STATUS.created) {
            enqueueSnackbar(message, { variant: "success" });
            formik.resetForm();
        } else {
            enqueueSnackbar(message, { variant: "error" });
            setErrors(errors);
        }

    };

    const validationSchema = yup.object().shape({
        nombre: yup
            .string()
            .required(VALIDATION_MESSAGES.required)
            .max(255, VALIDATION_MESSAGES.maxLength(255)),
        correo_principal: yup
            .string()
            .matches(
                CONSTANTS.email_uta_regex,
                VALIDATION_MESSAGES.invalidFormat
            )
            .required(VALIDATION_MESSAGES.required)
            .max(255, VALIDATION_MESSAGES.maxLength(255)),
        correo_secundario: yup
            .string()
            .matches(
                CONSTANTS.email_gmail_regex,
                VALIDATION_MESSAGES.invalidFormat
            )
            .required(VALIDATION_MESSAGES.required)
            .max(255, VALIDATION_MESSAGES.maxLength(255)),
        rol: yup
            .mixed()
            .oneOf(
                roles.map((item) => item.id),
                VALIDATION_MESSAGES.invalidOption
            )
            .required(VALIDATION_MESSAGES.required),
    });

    const formik = useFormik({
        onSubmit,
        initialValues,
        validationSchema,
        enableReinitialize: true,
    });

    const handleReset = () => {
        setErrors(undefined);
        formik.resetForm();
    };

    return {
        formik,
        errorsResponse: errors,
        handleReset,
        roles,
    };
};
