import axios from "axios";
import { HTTP_STATUS } from "models/enums";
import {
  IActaGrado,
  IAddActaGrado,
  IFilterPaginationProps,
  IResponse,
} from "models/interfaces";
import { handleErrors, HTTP_MESSAGES, parseFilterPaginationProps } from "utils";

export async function getActasGrado(
  options?: IFilterPaginationProps
): Promise<IResponse<IActaGrado[]>> {
  try {
    const params = parseFilterPaginationProps(options);

    const {
      data: { data },
    } = await axios.get("actas-grados?" + params);

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

export async function addActaGrado(
  form: IAddActaGrado
): Promise<IResponse<IActaGrado>> {
  try {
    const payload = form;

    const {
      data: { data },
    } = await axios.post("actas-grados", payload);

    return {
      status: HTTP_STATUS.created,
      message: HTTP_MESSAGES[HTTP_STATUS.created],
      data,
    };
  } catch (error) {
    return handleErrors(error);
  }
}
