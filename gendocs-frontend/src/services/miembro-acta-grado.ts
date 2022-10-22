import axios from "axios";
import { HTTP_STATUS } from "models/enums";
import {
  IAddAsistenteActaGrado,
  IFilterPaginationProps,
  IMiembroActaGrado,
  IResponse,
} from "models/interfaces";
import {
  clean,
  handleErrors,
  HTTP_MESSAGES,
  parseFilterPaginationProps,
  parseObjectToQueryParams,
} from "utils";

export async function getMiembrosActaGrado(
  props: IFilterPaginationProps
): Promise<IMiembroActaGrado[]> {
  try {
    const params = parseFilterPaginationProps(props);

    const {
      data: { data },
    } = await axios.get("miembro-acta-grado?" + params);

    return data;
  } catch (error) {
    return [];
  }
}

export async function saveMiembroActaGrado(
  form: IAddAsistenteActaGrado
): Promise<IResponse<IMiembroActaGrado>> {
  try {
    const {
      data: { data },
    } = await axios.post("miembro-acta-grado", clean(form));

    return {
      status: HTTP_STATUS.created,
      message: HTTP_MESSAGES[HTTP_STATUS.created],
      data,
    };
  } catch (error) {
    return handleErrors(error);
  }
}
