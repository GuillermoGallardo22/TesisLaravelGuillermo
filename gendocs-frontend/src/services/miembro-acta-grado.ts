import axios from "axios";
import { HTTP_STATUS } from "models/enums/HttpStatus";
import { IMiembroActaGrado } from "models/interfaces/IActaGrado";
import { IFilterPaginationProps } from "models/interfaces/IPagination";
import { IResponse } from "models/interfaces/IResponse";
import { handleErrors } from "utils/axios";
import { clean } from "utils/libs";
import { HTTP_MESSAGES } from "utils/messages";
import { parseFilterPaginationProps } from "utils/pagination";

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
  form: any
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

export async function updateMiembroActaGrado(
  id: number,
  form: any
): Promise<IResponse<IMiembroActaGrado>> {
  try {
    const {
      data: { data },
    } = await axios.put("miembro-acta-grado/" + id, form);

    return {
      status: HTTP_STATUS.ok,
      message: HTTP_MESSAGES[HTTP_STATUS.ok],
      data,
    };
  } catch (error) {
    return handleErrors(error);
  }
}

export async function deleteMiembroActaGrado(
  id: string | number
): Promise<IResponse<null>> {
  try {
    await axios.delete("miembro-acta-grado/" + id);

    return {
      data: null,
      status: HTTP_STATUS.ok,
      message: HTTP_MESSAGES[HTTP_STATUS.ok],
    };
  } catch (error) {
    return handleErrors(error);
  }
}

export async function marcarAsistencia(
  miembro: IMiembroActaGrado,
  asistio: boolean
): Promise<IResponse<IMiembroActaGrado>> {
  try {
    const {
      data: { data },
    } = await axios.patch("miembro-acta-grado/" + miembro.id, {
      asistio,
    });

    return {
      data: data,
      message: HTTP_MESSAGES[200],
      status: HTTP_STATUS.ok,
    };
  } catch (error) {
    return handleErrors(error);
  }
}
