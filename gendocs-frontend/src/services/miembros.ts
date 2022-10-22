import axios from "axios";
import { HTTP_STATUS } from "models/enums/HttpStatus";
import {
  ConsejoMiembroForm,
  IMiembro,
} from "models/interfaces/IConsejoMiembro";
import { INotificationProps } from "models/interfaces/INotification";
import { IFilterPaginationProps } from "models/interfaces/IPagination";
import { IResponse } from "models/interfaces/IResponse";
import { handleErrors } from "utils/axios";
import { CUSTOM_HTTP_MESSAGES, HTTP_MESSAGES } from "utils/messages";
import { parseFilterPaginationProps } from "utils/pagination";

export async function getMiembros(
  props: IFilterPaginationProps
): Promise<IMiembro[]> {
  try {
    const params = parseFilterPaginationProps(props);

    const {
      data: { data },
    } = await axios.get(`miembros?${params}`);

    return data;
  } catch (error) {
    return [];
  }
}

export async function saveMiembros(
  form: ConsejoMiembroForm
): Promise<IResponse<IMiembro>> {
  try {
    // const params = parseFilterPaginationProps(props);

    const {
      data: { data },
    } = await axios.post("miembros", form);

    return {
      data,
      message: HTTP_MESSAGES[201],
      status: HTTP_STATUS.created,
    };
  } catch (error) {
    return handleErrors(error);
  }
}

export async function deleteMiembro(
  id: string | number
): Promise<IResponse<null>> {
  try {
    await axios.delete("miembros/" + id);

    return {
      data: null,
      status: HTTP_STATUS.ok,
      message: HTTP_MESSAGES[200],
    };
  } catch (error) {
    return handleErrors(error);
  }
}

export async function marcarAsistencia(
  miembro: IMiembro,
  asistio: boolean
): Promise<IResponse<IMiembro>> {
  try {
    const {
      data: { data },
    } = await axios.patch("miembros/" + miembro.id, {
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

export async function sendNotification(
  props: INotificationProps
): Promise<IResponse<null>> {
  try {
    await axios.post("notificaciones", props);
    return {
      status: HTTP_STATUS.ok,
      message: CUSTOM_HTTP_MESSAGES.NOTI_EMAI_SEND,
      data: null,
    };
  } catch (error) {
    return handleErrors(error, null);
  }
}
