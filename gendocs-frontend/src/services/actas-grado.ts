import axios from "axios";
import { HTTP_STATUS } from "models/enums";
import {
  IActaGrado,
  IAddActaGrado,
  IFilterPaginationProps,
  IResponse,
} from "models/interfaces";
import {
  clean,
  handleErrors,
  HTTP_MESSAGES,
  parseFilterPaginationProps,
} from "utils";

export async function getActasGrado(
  options?: IFilterPaginationProps
): Promise<IResponse<IActaGrado[]>> {
  try {
    const params = parseFilterPaginationProps(options);

    const {
      data: { data },
    } = await axios.get("acta-grado?" + params);

    return {
      status: HTTP_STATUS.ok,
      message: HTTP_MESSAGES[HTTP_STATUS.ok],
      data: data,
    };
  } catch (error) {
    return {
      status: HTTP_STATUS.ok,
      message: HTTP_MESSAGES[HTTP_STATUS.ok],
      data: [],
    };
  }
}

export async function getActaGrado(
  actaGradoId: string | number
): Promise<IResponse<IActaGrado>> {
  try {
    const {
      data: { data },
    } = await axios.get("acta-grado/" + actaGradoId);

    return {
      status: HTTP_STATUS.ok,
      message: HTTP_MESSAGES[HTTP_STATUS.ok],
      data: data,
    };
  } catch (error) {
    return handleErrors(error);
  }
}

export async function addActaGrado(
  form: IAddActaGrado
): Promise<IResponse<IActaGrado>> {
  try {
    const payload = clean(form, {
      cleanValues: [-1],
    });
    console.log({ payload, form });

    const {
      data: { data },
    } = await axios.post("acta-grado", payload);

    return {
      status: HTTP_STATUS.created,
      message: HTTP_MESSAGES[HTTP_STATUS.created],
      data,
    };
  } catch (error) {
    return handleErrors(error);
  }
}

export async function deleteActaGrado(
  id: string | number
): Promise<IResponse<null>> {
  try {
    await axios.delete("acta-grado/" + id);

    return {
      data: null,
      status: HTTP_STATUS.ok,
      message: HTTP_MESSAGES[200],
    };
  } catch (error) {
    return handleErrors(error);
  }
}
