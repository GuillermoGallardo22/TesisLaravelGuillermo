import axios from "axios";
import { HTTP_STATUS } from "models/enums/HttpStatus";
import {
  IActaGrado,
  IAddActaGrado,
  IUpdateActaGrado,
} from "models/interfaces/IActaGrado";
import { IFilterPaginationProps } from "models/interfaces/IPagination";
import { IResponse } from "models/interfaces/IResponse";
import { handleErrors } from "utils/axios";
import { clean } from "utils/libs";
import { HTTP_MESSAGES } from "utils/messages";
import { parseFilterPaginationProps } from "utils/pagination";

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
  actaGradoId: string | number,
  options?: IFilterPaginationProps
): Promise<IResponse<IActaGrado>> {
  try {
    const params = parseFilterPaginationProps(options);

    const {
      data: { data },
    } = await axios.get("acta-grado/" + actaGradoId + "?" + params);

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

export async function updateActaGrado(
  form: IUpdateActaGrado
): Promise<IResponse<IActaGrado>> {
  try {
    const payload = clean(form, {
      cleanValues: [-1],
    });

    const {
      data: { data },
    } = await axios.put("acta-grado/" + form.id, payload);

    return {
      status: HTTP_STATUS.ok,
      message: HTTP_MESSAGES[HTTP_STATUS.ok],
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

export async function generarDocumentoActaGrado(
  id: number
): Promise<IResponse<IActaGrado>> {
  try {
    const {
      data: { data },
    } = await axios.post("acta-grado/" + id + "/documento");

    return {
      status: HTTP_STATUS.ok,
      message: HTTP_MESSAGES[HTTP_STATUS.ok],
      data,
    };
  } catch (error) {
    return handleErrors(error);
  }
}
