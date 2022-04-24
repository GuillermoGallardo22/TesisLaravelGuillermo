import axios from "axios";
import { HTTP_STATUS } from "models/enums";
import {
  IConsejo,
  IConsejoForm,
  IFilterPaginationProps,
  IPagination,
  IResponse,
} from "models/interfaces";
import {
  DEFAULT_PAGINATION_VALUES,
  handleErrors,
  HTTP_MESSAGES,
  parseFilterPaginationProps,
  parsePaginationData,
} from "utils";

export async function getConsejo(
  consejoId: string
): Promise<IResponse<IConsejo>> {
  try {
    const {
      data: { data },
    } = await axios.get(`consejos/${consejoId}`);

    return {
      data,
      message: HTTP_MESSAGES[200],
      status: HTTP_STATUS.ok,
    };
  } catch (error) {
    return handleErrors(error);
  }
}

export async function getConsejos(
  props: IFilterPaginationProps
): Promise<IPagination<IConsejo>> {
  try {
    const params = parseFilterPaginationProps(props);

    const { data } = await axios.get(`consejos?${params}`);

    return parsePaginationData(data);
  } catch (error) {
    return DEFAULT_PAGINATION_VALUES;
  }
}

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

export async function updateConsejo(
  form: IConsejoForm
): Promise<IResponse<IConsejo>> {
  try {
    const payload = {
      ...form,
      fecha: form.fecha.toISOString(),
    };

    const {
      data: { data },
    } = await axios.put("/consejos/" + form.id, payload);

    return {
      data,
      status: HTTP_STATUS.ok,
      message: HTTP_MESSAGES[200],
    };
  } catch (error) {
    return handleErrors(error);
  }
}

export async function cerrarConsejo(
  consejoId: number
): Promise<IResponse<IConsejo>> {
  try {
    const {
      data: { data },
    } = await axios.patch(`consejos/${consejoId}/cerrar`);

    return {
      data,
      status: HTTP_STATUS.ok,
      message: HTTP_MESSAGES[HTTP_STATUS.ok],
    };
  } catch (error) {
    return handleErrors(error);
  }
}

export async function deleteConsejo(
  id: string | number
): Promise<IResponse<IConsejo>> {
  try {
    const {
      data: { data },
    } = await axios.delete("consejos/" + id);

    return {
      data,
      status: HTTP_STATUS.ok,
      message: HTTP_MESSAGES[200],
    };
  } catch (error) {
    return handleErrors(error);
  }
}
