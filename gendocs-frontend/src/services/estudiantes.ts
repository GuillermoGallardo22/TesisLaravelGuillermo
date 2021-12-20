import axios from "axios";
import { HTTP_STATUS } from "models/enums";
import { IEstudiante, IResponse } from "models/interfaces";
import { BaseMultipleStudentForm } from "pages/private/student/hooks/useAddStudent";
import { handleErrors } from "utils/axios";
import { HTTP_MESSAGES } from "utils/messages";

export async function saveEstudiante(form: IEstudiante): Promise<IResponse<IEstudiante>> {
    try {
        const { data } = await axios.post("estudiantes", form);
        return {
            status: HTTP_STATUS.created,
            data: data,
            message: HTTP_MESSAGES["201"],
        };
    } catch (error) {
        return handleErrors(error);
    }
}

export async function saveListEstudiante(form: BaseMultipleStudentForm): Promise<IResponse<IEstudiante>> {
    try {
        const { data } = await axios.post("estudiantes-list", {
            carrera_id: form.carrera,
            estudiantes: form.estudiantes.map(i => ({
                ...i,
                carrera_id: form.carrera,
            })),
        });
        return {
            status: HTTP_STATUS.created,
            data: data,
            message: HTTP_MESSAGES["201"],
        };
    } catch (error) {
        return handleErrors(error);
    }
}
