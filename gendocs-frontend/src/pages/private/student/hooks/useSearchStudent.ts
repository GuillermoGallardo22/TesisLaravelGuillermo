import { useFormik } from "formik";
import { useState } from "react";

interface SearchStudentForm {
    search: string;
}

const initialValues: SearchStudentForm = { search: "" };

export const useSearchStudent = () => {
    const [submitting, setSubmitting] = useState(false);

    const onSubmit = async (form: SearchStudentForm) => {
        //
    };

    const formik = useFormik<SearchStudentForm>({
        initialValues,
        onSubmit,
    });

    return {
        formik,
        submitting,
    };
};
