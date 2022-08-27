import axios from "axios";
import { format, parseISO } from "date-fns";
import { HTTP_STATUS } from "models/enums";
import {
  IEstudiante,
  IFilterPaginationProps,
  IPagination,
  IResponse,
  SimpleStudentForm,
} from "models/interfaces";
import { BaseMultipleStudentForm } from "pages/private/facu/estudiantes/hooks/useAddEstudiantes";
import {
  CUSTOM_HTTP_MESSAGES,
  DEFAULT_PAGINATION_VALUES,
  handleErrors,
  HTTP_MESSAGES,
  parseFilterPaginationProps,
  parsePaginationData,
} from "utils";

export async function getEstudiantes(
  props: IFilterPaginationProps
): Promise<IPagination<IEstudiante>> {
  try {
    const params = parseFilterPaginationProps(props);

    const { data } = await axios.get<IPagination<IEstudiante>>(
      `estudiantes?${params}`
    );

    return parsePaginationData(data);
  } catch (error) {
    return DEFAULT_PAGINATION_VALUES;
  }
}

export async function saveEstudiante(
  form: SimpleStudentForm
): Promise<IResponse<IEstudiante>> {
  try {
    const { fecha_nacimiento, genero, ...rest } = form;

    const payload = {
      type: "simple",
      ...rest,
      genero: genero === -1 ? "" : genero,
      fecha_nacimiento:
        fecha_nacimiento instanceof Date
          ? format(fecha_nacimiento, "Y-MM-d")
          : "",
    };

    const {
      data: { data },
    } = await axios.post("estudiantes", payload);
    return {
      status: HTTP_STATUS.created,
      data: data,
      message: HTTP_MESSAGES["201"],
    };
  } catch (error) {
    return handleErrors(error);
  }
}

export async function saveListEstudiante(
  form: BaseMultipleStudentForm
): Promise<IResponse<IEstudiante>> {
  try {
    const payload = {
      type: "list",
      carrera_id: form.carrera,
      estudiantes: form.estudiantes.map((i) => ({
        ...i,
        carrera_id: form.carrera,
      })),
    };

    const { data: data } = await axios.post("estudiantes", payload);
    return {
      status: HTTP_STATUS.created,
      data: data,
      message: HTTP_MESSAGES["201"],
    };
  } catch (error) {
    return handleErrors(error);
  }
}

export async function getEstudianteById(
  estudianteId: string | number
): Promise<IResponse<IEstudiante>> {
  try {
    const {
      data: { data },
    } = await axios.get("estudiantes/" + estudianteId);
    return {
      status: HTTP_STATUS.ok,
      data: {
        ...data,
        celular: data?.celular || "",
        correo_uta: data?.correo_uta || "",
        matricula: data?.matricula || "",
        folio: data?.folio || "",
        carrera: data?.carrera || "",
        telefono: data?.telefono || "",
        correo: data?.correo || "",
        fecha_nacimiento:
          data?.fecha_nacimiento === null
            ? null
            : parseISO(data.fecha_nacimiento),
        genero: data?.genero || "",
      },
      message: "",
    };
  } catch (error) {
    return handleErrors(error);
  }
}

export async function updateEstudiante(
  form: IEstudiante
): Promise<IResponse<IEstudiante>> {
  try {
    const { carrera, genero, fecha_nacimiento, ...rest } = form;

    const payload = {
      ...rest,
      genero: genero === -1 ? "" : genero,
      fecha_nacimiento:
        fecha_nacimiento instanceof Date
          ? format(fecha_nacimiento, "Y-MM-d")
          : "",
      carrera_id: carrera,
    };

    const { data: data } = await axios.put("estudiantes/" + form.id, payload);

    return {
      status: HTTP_STATUS.ok,
      data: data,
      message: HTTP_MESSAGES[200],
    };
  } catch (error) {
    return handleErrors(error);
  }
}

export async function sendEmail(
  mensaje: string,
  estudiante: IEstudiante
): Promise<IResponse<null>> {
  try {
    await axios.post("estudiantes/email-notificacion", {
      mensaje,
      estudiante: estudiante.id,
    });

    return {
      status: HTTP_STATUS.ok,
      data: null,
      message: CUSTOM_HTTP_MESSAGES.NOTI_EMAI_SEND,
    };
  } catch (error) {
    return handleErrors(error);
  }
}
