import axios from "axios";
import { HTTP_STATUS } from "models/enums";
import { IConsejo, IConsejoForm, IResponse } from "models/interfaces";
import { handleErrors } from "utils/axios";
import { HTTP_MESSAGES } from "utils/messages";

export async function saveConsejo(
    form: IConsejoForm
): Promise<IResponse<IConsejo>> {
    try {
        const payload = {
            ...form,
            fecha: form.fecha.toISOString(),
        };

        const {
            data: { data },
        } = await axios.post("/consejos", payload);

        return {
            data,
            status: HTTP_STATUS.created,
            message: HTTP_MESSAGES[201],
        };
    } catch (error) {
        return handleErrors(error);
    }
}
