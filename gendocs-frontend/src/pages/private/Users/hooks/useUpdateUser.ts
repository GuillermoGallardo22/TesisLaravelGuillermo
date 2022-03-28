import { useFormik } from "formik";
import { useErrorsResponse } from "hooks/useErrorsResponse";
import { HTTP_STATUS } from "models/enums";
import { IRole, IUser, IUserForm } from "models/interfaces";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser, getRoles, getUserById } from "services";
import { CONSTANTS } from "utils/constants";
import { VALIDATION_MESSAGES } from "utils/messages";

import * as yup from "yup";

const initialValues: IUserForm = {
    correo_principal: "",
    nombre: "",
    correo_secundario: "",
    id: -1,
    rol: -1,
    status: true,
};

type useUpdateUserProps = {
    userId: string;
};

export const useUpdateUser = ({ userId }: useUpdateUserProps) => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(initialValues);
    const [roles, setRoles] = useState<IRole[]>([]);
    const { errorSummary, setErrorSummary, cleanErrorsSumary } =
        useErrorsResponse();

    const { enqueueSnackbar } = useSnackbar();

    const handleSetUser = (user: IUser, roles: IRole[]) =>
        setUser({
            nombre: user.name,
            correo_principal: user.email,
            correo_secundario: user.email_gmail,
            status: user.status,
            id: user.id,
            rol: roles.find((i) => i.nombre === user.roles[0])?.id || -1,
        });

    const loadInitData = useCallback(() => {
        if (!userId) navigate(-1);

        setLoading(true);
        Promise.all([getUserById(userId), getRoles()])
            .then((r) => {
                const [userResult, _roles] = r;

                if (userResult.status !== HTTP_STATUS.ok) {
                    enqueueSnackbar(userResult.message, { variant: "warning" });
                    navigate(-1);
                }

                handleSetUser(userResult.data, _roles);
                setRoles(_roles);
            })
            .finally(() => setLoading(false));
    }, [userId]);

    useEffect(() => {
        loadInitData();
    }, [loadInitData]);

    const onSubmit = async (form: IUserForm): Promise<void> => {
        cleanErrorsSumary();

        const { status, message, errors, data } = await updateUser(form);

        console.log({ status, message, errors, data });

        if (status === HTTP_STATUS.ok) {
            handleSetUser(data, roles);
            enqueueSnackbar(message, { variant: "success" });
            formik.resetForm();
        } else {
            enqueueSnackbar(message, { variant: "error" });
            setErrorSummary(errors);
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
        validationSchema,
        initialValues: user,
        enableReinitialize: true,
    });

    const handleReset = () => {
        cleanErrorsSumary();
        formik.resetForm();
    };

    return {
        formik,
        errorsResponse: errorSummary,
        handleReset,
        roles,
        loading,
    };
};
