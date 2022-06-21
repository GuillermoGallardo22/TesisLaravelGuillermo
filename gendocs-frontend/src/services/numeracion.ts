import axios from "axios";
import { HTTP_STATUS } from "models/enums";
import {
  IFilterPaginationProps,
  INumeracion,
  IReservaForm,
  IResponse,
} from "models/interfaces";
import { handleErrors, HTTP_MESSAGES, parseFilterPaginationProps } from "utils";

export async function getNumeracion(
  props: IFilterPaginationProps
): Promise<INumeracion> {
  try {
    const params = parseFilterPaginationProps(props);

    const {
      data: { data },
    } = await axios.get(`numeracion?${params}`);

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
