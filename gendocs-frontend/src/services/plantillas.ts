import axios from "axios";
import { HTTP_STATUS } from "models/enums";
import {
    IFilterPaginationProps,
    IMoveTemplateForm,
    IPagination,
    IPlantilla,
    IResponse
} from "models/interfaces";
import { handleErrors } from "utils/axios";
import { HTTP_MESSAGES } from "utils/messages";
import {
    DEFAULT_PAGINATION_VALUES,
    parseFilterPaginationProps,
    parsePaginationData
} from "utils/pagination";

type OptionsParseResponseToTemplate = {
    justForeignKey?: boolean;
};

function parseResponseToTemplate(
    data: any,
    options?: OptionsParseResponseToTemplate
): IPlantilla {
    const { justForeignKey } = options || { justForeignKey: false };

    return {
        ...data,
        proceso: justForeignKey
            ? typeof data?.proceso === "number"
                ? data.proceso
                : data.proceso.id
            : data.proceso,
    };
}

export async function savePlantilla(
    form: IPlantilla
): Promise<IResponse<IPlantilla>> {
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

export async function getPlantillasByProcesoId(
    props: IFilterPaginationProps
): Promise<IPagination<IPlantilla>> {
    try {
        const params = parseFilterPaginationProps(props);

        const { data } = await axios.get(`plantillas?${params}`);

        return parsePaginationData(data);
    } catch (error) {
        return DEFAULT_PAGINATION_VALUES;
    }
}

export async function getPlantillaById(
    templateId: number,
    options?: OptionsParseResponseToTemplate
): Promise<IResponse<IPlantilla>> {
    try {
        const {
            data: { data },
        } = await axios.get("plantillas/" + templateId);
        return {
            status: HTTP_STATUS.ok,
            data: parseResponseToTemplate(data, options),
            message: "",
        };
    } catch (error) {
        return handleErrors(error);
    }
}

export async function updatePlantilla(
    form: IPlantilla
): Promise<IResponse<IPlantilla>> {
    try {
        const {
            data: { data },
        } = await axios.put("plantillas/" + form.id, form);
        return {
            status: HTTP_STATUS.ok,
            data: parseResponseToTemplate(data, { justForeignKey: true }),
            message: HTTP_MESSAGES[200],
        };
    } catch (error) {
        return handleErrors(error);
    }
}

export async function movePlantilla(
    form: IMoveTemplateForm
): Promise<IResponse<IPlantilla>> {
    try {
        const {
            data: { data },
        } = await axios.put(
            "plantillas/" + form.plantilla + "/move/" + form.proceso
        );
        return {
            status: HTTP_STATUS.ok,
            data: parseResponseToTemplate(data, { justForeignKey: true }),
            message: HTTP_MESSAGES[200],
        };
    } catch (error) {
        return handleErrors(error);
    }
}
