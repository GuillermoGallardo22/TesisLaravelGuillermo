import axios from "axios";
import { HTTP_STATUS } from "models/enums";
import { INumeracion, IReservaForm, IResponse } from "models/interfaces";
import { handleErrors, HTTP_MESSAGES } from "utils";

export async function getNumeracion(): Promise<INumeracion> {
    try {
        const {
            data: { data },
        } = await axios.get("numeracion");

        return data;
    } catch (error) {
        return {
            siguiente: -1,
            reservados: [],
            encolados: [],
        };
    }
}

export async function createReserva(
    form: IReservaForm
): Promise<IResponse<null>> {
    try {
        const payload = form;

        await axios.post("numeracion", payload);

        return {
            data: null,
            message: HTTP_MESSAGES[201],
            status: HTTP_STATUS.created,
        };
    } catch (error) {
        console.error({ error });
        return handleErrors(error);
    }
}
