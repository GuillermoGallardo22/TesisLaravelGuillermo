import { GridRowId } from "@mui/x-data-grid";
import axios from "axios";
import { HTTP_STATUS } from "models/enums";
import { IPagination, IProceso, IResponse } from "models/interfaces";
import { handleErrors } from "utils/axios";
import { HTTP_MESSAGES } from "utils/messages";

export async function getProcesos({
    cursor,
    search,
}: {
    cursor: GridRowId | null | undefined,
    search?: string | null | undefined,
}): Promise<IPagination<IProceso>> {
    try {
        cursor = cursor || 1;
        search = search || "";

        const { data } = await axios.get(`procesos?page=${cursor}&search=${search}`);

        return data;
    } catch (error) {
        return {
            data: [],
            links: {
                first: "?page=1",
                last: "?page=1",
            },
            meta: {
                path: "procesos",
                current_page: 1,
                last_page: 1,
                per_page: 0,
                total: 0,
                links: [],
            },
        };
    }
}

export async function saveProceso(form: IProceso): Promise<IResponse<IProceso>> {
    try {
        const { data } = await axios.post("procesos", form);
        return {
            status: HTTP_STATUS.created,
            data: data,
            message: HTTP_MESSAGES[201],
        };
    } catch (error) {
        return handleErrors(error);
    }
}

export async function updateProceso(form: IProceso): Promise<IResponse<IProceso>> {
    try {
        const { data } = await axios.put("procesos/" + form.id, form);
        return {
            status: HTTP_STATUS.created,
            data: data,
            message: HTTP_MESSAGES[201],
        };
    } catch (error) {
        return handleErrors(error);
    }
}

export async function getProcesoById(procesoId: number | string): Promise<IResponse<IProceso>> {
    try {
        const { data } = await axios.get("procesos/" + procesoId);
        return {
            status: HTTP_STATUS.ok,
            data: data.data,
            message: "",
        };
    } catch (error) {
        return handleErrors(error);
    }
}
