import axios from "axios";
import { HTTP_STATUS } from "models/enums/HttpStatus";
import {
  INumeracion,
  INumeracionActaGrado,
  IReservaForm,
} from "models/interfaces/INumeracion";
import { IFilterPaginationProps } from "models/interfaces/IPagination";
import { IResponse } from "models/interfaces/IResponse";
import { handleErrors } from "utils/axios";
import { HTTP_MESSAGES } from "utils/messages";
import { parseFilterPaginationProps } from "utils/pagination";

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

export async function getNumeracionActaGrado(
  props: IFilterPaginationProps
): Promise<IResponse<INumeracionActaGrado>> {
  try {
    const params = parseFilterPaginationProps(props);

    const {
      data: { data },
    } = await axios.get(`numeracion-acta-grado?${params}`);

    return {
      status: HTTP_STATUS.ok,
      message: HTTP_MESSAGES[HTTP_STATUS.ok],
      data,
    };
  } catch (error) {
    return {
      status: HTTP_STATUS.notFound,
      message: HTTP_MESSAGES[HTTP_STATUS.notFound],
      data: {
        siguiente: -1,
        encolados: [],
      },
    };
  }
}

export async function deleteReserva(
  id: string | number
): Promise<IResponse<null>> {
  try {
    await axios.delete("numeracion/" + id);

    return {
      data: null,
      message: HTTP_MESSAGES[200],
      status: HTTP_STATUS.ok,
    };
  } catch (error) {
    return handleErrors(error);
  }
}
