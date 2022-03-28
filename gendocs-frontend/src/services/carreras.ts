import axios from "axios";
import { HTTP_STATUS } from "models/enums";
import { ICarrera, IFilterPaginationProps, IResponse } from "models/interfaces";
import { handleErrors, HTTP_MESSAGES, parseFilterPaginationProps } from "utils";

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

export async function getCarrera(
    carreraId: string
): Promise<IResponse<ICarrera>> {
    try {
        const {
            data: { data },
        } = await axios.get("carreras/" + carreraId);
        return {
            data,
            message: HTTP_MESSAGES[200],
            status: HTTP_STATUS.ok,
        };
    } catch (error) {
        return handleErrors(error, { id: -1, nombre: "", estado: false });
    }
}

export async function saveCarrera(form: ICarrera): Promise<IResponse<null>> {
    try {
        await axios.post("carreras", form);

        return {
            status: HTTP_STATUS.created,
            message: HTTP_MESSAGES[201],
            data: null,
        };
    } catch (error) {
        return handleErrors(error);
    }
}

export async function updateCarrera(form: ICarrera): Promise<IResponse<null>> {
    try {
        await axios.put(`carreras/${form.id}`, form);

        return {
            status: HTTP_STATUS.created,
            message: HTTP_MESSAGES[201],
            data: null,
        };
    } catch (error) {
        return handleErrors(error);
    }
}
