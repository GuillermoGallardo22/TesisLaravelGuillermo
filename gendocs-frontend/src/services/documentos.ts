import axios from "axios";
import { HTTP_STATUS } from "models/enums";
import { IDocumento, IDocumentoForm, IFilterPaginationProps, IPagination, IResponse } from "models/interfaces";
import { handleErrors } from "utils/axios";
import { HTTP_MESSAGES } from "utils/messages";
import { parseFilterPaginationProps, parsePaginationData, DEFAULT_PAGINATION_VALUES } from "utils/pagination";

export async function saveDocumento(
    form: IDocumentoForm
): Promise<IResponse<null>> {
    try {
        await axios.post("documentos", form);

        return {
            status: HTTP_STATUS.created,
            message: HTTP_MESSAGES[201],
            data: null,
        };
    } catch (error) {
        return handleErrors(error);
    }
}

export async function getDocumentos(
    props?: IFilterPaginationProps
): Promise<IPagination<IDocumento>> {
    try {
        const params = parseFilterPaginationProps(props);

        const { data } = await axios.get(`documentos?${params}`);

        return parsePaginationData(data);
    } catch (error) {
        return DEFAULT_PAGINATION_VALUES;
    }
}
