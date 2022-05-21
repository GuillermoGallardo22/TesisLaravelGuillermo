import {
  GridValueFormatterParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { format } from "date-fns";
import {
  IConsejo,
  IDocumento,
  IMiembro,
  IProceso,
  ITipoConsejo,
} from "models/interfaces";
import { MultipleStudentForm } from "pages/private/estudiantes/hooks/useAddEstudiantes";
import { read, utils } from "xlsx";
import { parseToDateTime } from "./date";

export const DRAWERWIDTH = 240;

type SheetType = {
  A: string;
  B: string;
  C: string;
  D: string;
  E: string;
  F: string;
  G: string;
  H: string;
  I: string;
};

const cleanFields = (data: string | null | undefined): string => {
  return !data ? "" : data.length === 1 ? "" : data;
};

export async function readFile(file: File): Promise<MultipleStudentForm[]> {
  try {
    const data = await file.arrayBuffer();

    const workbook = read(data);

    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const parseData = utils.sheet_to_json<SheetType>(sheet, {
      header: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
    });

    const students = parseData
      .slice(1)
      .map<MultipleStudentForm>((element, index) => ({
        id: index + 2,
        cedula: cleanFields(element["A"]),
        apellidos: cleanFields(element["B"]),
        nombres: cleanFields(element["C"]),
        telefono: cleanFields(element["D"]),
        celular: cleanFields(element["E"]),
        correo: cleanFields(element["F"]),
        correo_uta: cleanFields(element["G"]),
        matricula: cleanFields(element["H"]),
        folio: cleanFields(element["I"]),
      }));

    return students;
  } catch (error) {
    return [];
  }
}

export function parseObjectToQueryParams(queryParams: any): string {
  try {
    // const queryParams = { ...data };
    return Object.keys(queryParams)
      .map((k) => queryParams[k] && k + "=" + queryParams[k])
      .filter((i) => i)
      .join("&");
  } catch (error) {
    return "";
  }
}

export function unique(
  this: any,
  message: string,
  mapper = (val: unknown) => val
) {
  return this.test(
    "unique",
    message,
    (list = []) => list.length === new Set(list.map(mapper)).size
  );
}

export function getNombreCompleto(params: GridValueGetterParams<IDocumento>) {
  if (!params.row.estudiante) return null;
  return [params.row.estudiante.apellidos, params.row.estudiante.nombres].join(
    " "
  );
}

export function getPlantilla(params: GridValueGetterParams<IDocumento>) {
  return params.row.plantilla.nombre;
}

export function getProceso(params: GridValueGetterParams<IDocumento>) {
  return (params.row.plantilla.proceso as IProceso).nombre;
}

export function getAutor(params: GridValueGetterParams<IDocumento>) {
  return params.row.autor.name;
}

export function getCreado(params: GridValueFormatterParams) {
  return parseToDateTime(params.value as string);
}

export function getDefaultNotificationMessage(
  plantilla: string,
  proceso: string,
  user: string
) {
  return `Me permito notificar a usted que su trámite ${plantilla} del proceso de ${proceso} ha sido atendido.

Pronto será despachado a su correo institucional.

Atentamente,

${user}`;
}

export function getDefaultNotificationMessageAsistencia(
  consejo: IConsejo,
  user: string
) {
  const tipoConsejo = (
    consejo.tipo_consejo as ITipoConsejo
  ).nombre.toUpperCase();

  const fecha = format(new Date(consejo.fecha), "dd/MM/yyyy");
  const hora = format(new Date(consejo.fecha), "p");

  return `Se le notifica la asistencia a la SESIÓN ${tipoConsejo} DE CONSEJO DIRECTIVO DE LA FACULTAD DE INGENIERÍA EN SISTEMAS, ELECTRÓNICA E INDUSTRIAL, que se llevará acabo el ${fecha} a las ${hora}.

Se le agradece su puntual asistencia.

Atentamente,

${user}`;
}

export function generateLink(data: IDocumento, user: string) {
  const celular = data?.estudiante?.celular;

  if (!celular) return "";

  const text = getDefaultNotificationMessage(
    data.plantilla.nombre,
    (data.plantilla.proceso as IProceso).nombre,
    user
  );

  const params = parseObjectToQueryParams({
    phone: "+593" + celular.substring(1),
    text,
  });

  return `https://api.whatsapp.com/send?${encodeURI(params)}`;
}

export function getNombreCompletoMiembro(
  params: GridValueGetterParams<IMiembro>
) {
  if (!params?.row?.docente?.nombres) return null;
  return params.row.docente.nombres;
}

export function formatRecipient(name: string, email: string): string {
  return `${name} <${email}>`;
}

const formatter = new Intl.ListFormat("es");

export function formatRecipients(list: [string, string][]): string {
  return formatter.format(
    list.map(([name, email]) => formatRecipient(name, email))
  );
}

export function listFormat(list: string[]): string {
  return formatter.format(list);
}
