import axios from "axios";
import { HTTP_STATUS } from "models/enums";
import { IPagination, IResponse } from "models/interfaces";
import { IPlantilla } from "pages/private/processes/hooks/useAddTemplates";
import { handleErrors } from "utils/axios";
import { parseObjectToQueryParams } from "utils/libs";
import { HTTP_MESSAGES } from "utils/messages";

export async function savePlantilla(form: IPlantilla): Promise<IResponse<IPlantilla>> {
    try {
        const { data } = await axios.post("plantillas", form);
        return {
            status: HTTP_STATUS.created,
            data: data,
            message: HTTP_MESSAGES[201],
        };
    } catch (error) {
        return handleErrors(error);
    }
}

export async function getPlantillasByProcesoId({
    procesoId,
    cursor,
    search,
}: {
    procesoId: string,
    cursor?: string | number | null | undefined,
    search?: string | null | undefined,
}): Promise<IPagination<IPlantilla>> {
    try {

        const params = parseObjectToQueryParams({
            "filter[proceso]": procesoId,
            "filter[search]": search,
            "page": cursor || 1,
        });

        const { data } = await axios.get(`plantillas?${params}`);

        return {
            ...data,
            meta: {
                ...data.meta,
                next_page: data?.links?.next ? ((new URLSearchParams(data?.links?.next.split("?")[1])).get("page")) : null,
            }
        };
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

export async function getPlantillaById(templateId: number): Promise<IResponse<IPlantilla>> {
    try {
        const { data: { data } } = await axios.get("plantillas/" + templateId);
        return {
            status: HTTP_STATUS.ok,
            data: data,
            message: "",
        };
    } catch (error) {
        return handleErrors(error);
    }
}

export async function updatePlantilla(form: IPlantilla): Promise<IResponse<IPlantilla>> {
    try {
        const { data: { data } } = await axios.put("plantillas/" + form.id, form);
        return {
            status: HTTP_STATUS.ok,
            data: data,
            message: "",
        };
    } catch (error) {
        return handleErrors(error);
    }
}
