import axios from "axios";
import { HTTP_STATUS } from "models/enums";
import {
    ConsejoMiembroForm,
    IMiembro,
    IFilterPaginationProps,
    IResponse,
} from "models/interfaces";
import { handleErrors } from "utils/axios";
import { HTTP_MESSAGES } from "utils/messages";
import { parseFilterPaginationProps } from "utils/pagination";

export async function getMiembros(
    props: IFilterPaginationProps
): Promise<IMiembro[]> {
    try {
        const params = parseFilterPaginationProps(props);

        const {
            data: { data },
        } = await axios.get(`miembros?${params}`);

        return data;
    } catch (error) {
        return [];
    }
}

export async function saveMiembros(
    form: ConsejoMiembroForm
): Promise<IResponse<IMiembro>> {
    try {
        // const params = parseFilterPaginationProps(props);

        const {
            data: { data },
        } = await axios.post("miembros", form);

        return {
            data,
            message: HTTP_MESSAGES[201],
            status: HTTP_STATUS.created,
        };
    } catch (error) {
        return handleErrors(error);
    }
}

export async function deleteMiembro(
    id: string | number
): Promise<IResponse<null>> {
    try {
        await axios.delete("miembros/" + id);

        return {
            data: null,
            status: HTTP_STATUS.ok,
            message: HTTP_MESSAGES[200],
        };
    } catch (error) {
        return handleErrors(error);
    }
}
