import { GridRowId } from "@mui/x-data-grid";
import axios from "axios";
import { HTTP_STATUS } from "models/enums";
import { IEstudiante, IPagination, IResponse } from "models/interfaces";
import { BaseMultipleStudentForm } from "pages/private/student/hooks/useAddStudent";
import { handleErrors } from "utils/axios";
import { parseObjectToQueryParams } from "utils/libs";
import { HTTP_MESSAGES } from "utils/messages";

export async function getEstudiantes({
    number,
    size,
    search,
}: {
    number?: number | null | undefined;
    search?: string | null | undefined;
    size?: number | null | undefined;
}): Promise<IPagination<IEstudiante>> {
    try {
        const params = parseObjectToQueryParams({
            "filter[search]": search,
            "page[number]": (number || 0) + 1,
            "page[size]": size,
        });

        const { data } = await axios.get<IPagination<IEstudiante>>(
            `estudiantes?${params}`
        );

        return {
            ...data,
            meta: {
                ...data.meta,
                current_page: data.meta.current_page - 1,
            },
        };
    } catch (error) {
        return {
            data: [],
            meta: {
                current_page: 0,
                last_page: 0,
                per_page: 0,
                total: 0,
            },
        };
    }
}

export async function saveEstudiante(
    form: IEstudiante
): Promise<IResponse<IEstudiante>> {
    try {
        const payload = {
            type: "simple",
            ...form,
        };

        const {
            data: { data },
        } = await axios.post("estudiantes", payload);
        return {
            status: HTTP_STATUS.created,
            data: data,
            message: HTTP_MESSAGES["201"],
        };
    } catch (error) {
        return handleErrors(error);
    }
}

export async function saveListEstudiante(
    form: BaseMultipleStudentForm
): Promise<IResponse<IEstudiante>> {
    try {
        const payload = {
            type: "list",
            carrera_id: form.carrera,
            estudiantes: form.estudiantes.map((i) => ({
                ...i,
                carrera_id: form.carrera,
            })),
        };

        const { data: data } = await axios.post("estudiantes", payload);
        return {
            status: HTTP_STATUS.created,
            data: data,
            message: HTTP_MESSAGES["201"],
        };
    } catch (error) {
        return handleErrors(error);
    }
}

export async function getEstudianteById(
    estudianteId: string | number
): Promise<IResponse<IEstudiante>> {
    try {
        const {
            data: { data },
        } = await axios.get("estudiantes/" + estudianteId);
        return {
            status: HTTP_STATUS.ok,
            data: {
                ...data,
                celular: data?.celular || "",
                correo_uta: data?.correo_uta || "",
                matricula: data?.matricula || "",
                folio: data?.folio || "",
                carrera: data?.carrera || "",
                telefono: data?.telefono || "",
                correo: data?.correo || "",
            },
            message: "",
        };
    } catch (error) {
        return handleErrors(error);
    }
}

export async function updateEstudiante(
    form: IEstudiante
): Promise<IResponse<IEstudiante>> {
    try {
        const { data: data } = await axios.put("estudiantes/" + form.id, {
            ...form,
            carrera_id: form.carrera,
        });

        return {
            status: HTTP_STATUS.ok,
            data: data,
            message: HTTP_MESSAGES[200],
        };
    } catch (error) {
        return handleErrors(error);
    }
}
