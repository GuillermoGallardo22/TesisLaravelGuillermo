import axios from "axios";
import { HTTP_STATUS } from "models/enums";
import { IDocumentoForm, IResponse } from "models/interfaces";
import { handleErrors } from "utils/axios";
import { HTTP_MESSAGES } from "utils/messages";

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
