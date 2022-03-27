import axios from "axios";
import { HTTP_STATUS } from "models/enums";
import {
    ConsejoMiembroForm,
    IConsejoMiembro,
    IFilterPaginationProps,
    IResponse,
} from "models/interfaces";
import { handleErrors } from "utils/axios";
import { HTTP_MESSAGES } from "utils/messages";
import { parseFilterPaginationProps } from "utils/pagination";

export async function getMiembros(
    props: IFilterPaginationProps
): Promise<IConsejoMiembro[]> {
    try {
        const params = parseFilterPaginationProps(props);

        const {
            data: { data },
        } = await axios.get(`consejos-miembros?${params}`);

        return data;
    } catch (error) {
        return [];
    }
}

export async function saveMiembros(
    form: ConsejoMiembroForm
): Promise<IResponse<IConsejoMiembro>> {
    try {
        // const params = parseFilterPaginationProps(props);

        const {
            data: { data },
        } = await axios.post("consejos-miembros", form);

        return {
            data,
            message: HTTP_MESSAGES[201],
            status: HTTP_STATUS.created,
        };
    } catch (error) {
        return handleErrors(error);
    }
}
