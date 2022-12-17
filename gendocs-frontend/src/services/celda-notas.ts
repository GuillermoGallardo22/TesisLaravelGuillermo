import axios from "axios";
import { HTTP_STATUS } from "models/enums/HttpStatus";
import { ICeldaNota, ICreateCeldaNota } from "models/interfaces/ICeldaNota";
import { IFilterPaginationProps } from "models/interfaces/IPagination";
import { IResponse } from "models/interfaces/IResponse";
import { handleErrors } from "utils/axios";
import { HTTP_MESSAGES } from "utils/messages";
import { parseFilterPaginationProps } from "utils/pagination";

export async function celdaNotas(
  props?: IFilterPaginationProps
): Promise<ICeldaNota[]> {
  try {
    const params = parseFilterPaginationProps(props);

    const {
      data: { data },
    } = await axios.get(`celdas-nota-tipo-acta-grado?${params}`);

    return data;
  } catch (error) {
    return [];
  }
}

export async function createCeldaNota(
  form: ICreateCeldaNota
): Promise<IResponse<ICeldaNota>> {
  try {
    const payload: ICreateCeldaNota = {
      ...form,
      celda: form.celda.toUpperCase(),
    };

    const {
      data: { data },
    } = await axios.post("celdas-nota-tipo-acta-grado", payload);

    return {
      status: HTTP_STATUS.created,
      message: HTTP_MESSAGES[HTTP_STATUS.created],
      data,
    };
  } catch (error) {
    return handleErrors(error);
  }
}

export async function deleteCeldaNota(
  celdaNotaId: number
): Promise<IResponse<null>> {
  try {
    await axios.delete("celdas-nota-tipo-acta-grado/" + celdaNotaId);

    return {
      status: HTTP_STATUS.ok,
      message: HTTP_MESSAGES[HTTP_STATUS.ok],
      data: null,
    };
  } catch (error) {
    return handleErrors(error);
  }
}
