import axios from "axios";
import { HTTP_STATUS } from "models/enums";
import { ICarrera, IFilterPaginationProps, IResponse } from "models/interfaces";
import { handleErrors } from "utils/axios";
import { HTTP_MESSAGES } from "utils/messages";
import { parseFilterPaginationProps } from "utils/pagination";

export async function getAllCarreras(
    props?: IFilterPaginationProps
): Promise<ICarrera[]> {
    try {
        const params = parseFilterPaginationProps(props);

        const {
            data: { data },
        } = await axios.get(`carreras?${params}`);
        return data;
    } catch (error) {
        return [];
    }
}
