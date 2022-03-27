import axios from "axios";
import { HTTP_STATUS } from "models/enums";
import {
    DocenteForm,
    IDocente,
    IFilterPaginationProps,
    IResponse,
} from "models/interfaces";
import { handleErrors } from "utils/axios";
import { HTTP_MESSAGES } from "utils/messages";
import { parseFilterPaginationProps } from "utils/pagination";

export async function saveDocente(
    form: DocenteForm
): Promise<IResponse<IDocente>> {
    try {
        const payload = {
            type: "simple",
            ...form,
        };

        const {
            data: { data },
        } = await axios.post("docentes", payload);

        return {
            status: HTTP_STATUS.created,
            data: data,
            message: HTTP_MESSAGES[201],
        };
    } catch (error) {
        return handleErrors(error);
    }
}

export async function updateDocente(
    form: IDocente
): Promise<IResponse<IDocente>> {
    try {
        const {
            data: { data },
        } = await axios.put("docentes/" + form.id, form);

        return {
            status: HTTP_STATUS.ok,
            data: data,
            message: HTTP_MESSAGES[200],
        };
    } catch (error) {
        return handleErrors(error);
    }
}

export async function getDocentes(
    props?: IFilterPaginationProps
): Promise<IDocente[]> {
    try {
        const params = parseFilterPaginationProps(props);

        const {
            data: { data },
        } = await axios.get(`docentes?${params}`);

        return data;
    } catch (error) {
        return [];
    }
}

export async function getDocente(
    docenteId: string
): Promise<IResponse<IDocente>> {
    try {
        const {
            data: { data },
        } = await axios.get("docentes/" + docenteId);

        return {
            data,
            message: "",
            status: HTTP_STATUS.ok,
        };
    } catch (error) {
        return handleErrors(error, null);
    }
}
