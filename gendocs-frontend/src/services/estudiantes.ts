import { GridRowId } from "@mui/x-data-grid";
import axios from "axios";
import { HTTP_STATUS } from "models/enums";
import { IEstudiante, IPagination, IResponse } from "models/interfaces";
import { BaseMultipleStudentForm } from "pages/private/student/hooks/useAddStudent";
import { handleErrors } from "utils/axios";
import { HTTP_MESSAGES } from "utils/messages";

export async function getEstudiantes({
    cursor,
    search,
}: {
    cursor: GridRowId | null | undefined,
    search?: string | null | undefined,
}): Promise<IPagination<IEstudiante>> {
    try {

        cursor = cursor || 1;
        search = search || "";

        const { data } = await axios.get<IPagination<IEstudiante>>(`estudiantes?page=${cursor}&search=${search}`);

        return {
            ...data,
            next_page_url: (data.last_page > cursor) ? ((+cursor) + 1) + "" : null,
        };
    } catch (error) {
        return {
            current_page: 0,
            data: [],
            last_page: 0,
            total: 0,
        };
    }
}

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

export async function getEstudianteById(estudianteId: string | number): Promise<IResponse<IEstudiante>> {
    try {
        const { data } = await axios.get("estudiantes/" + estudianteId);
        return {
            status: HTTP_STATUS.ok,
            data: {
                ...data,
                carrera: (+data.carrera_id)
            },
            message: "",
        };
    } catch (error) {
        return handleErrors(error);
    }
}

export async function updateEstudiante(form: IEstudiante): Promise<IResponse<IEstudiante>> {
    try {
        const { data } = await axios.put("estudiantes/" + form.id, {
            ...form,
            carrera_id: form.carrera,
        });

        return {
            status: HTTP_STATUS.ok,
            data: {
                ...data,
                carrera: (+data.carrera_id)
            },
            message: "",
        };
    } catch (error) {
        return handleErrors(error);
    }
}
