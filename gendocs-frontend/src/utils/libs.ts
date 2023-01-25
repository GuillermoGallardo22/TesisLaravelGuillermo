import {
  GridValueFormatterParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { format, isValid, parseISO } from "date-fns";
import { isEmpty, isPlainObject, transform } from "lodash";
import { Genero } from "models/enums/Genero";
import { LocalStorageKeys } from "models/enums/LocalStorageKeys";
import { IAula } from "models/interfaces/IAula";
import { ICanton } from "models/interfaces/ICanton";
import { IConsejo } from "models/interfaces/IConsejo";
import { IMiembro } from "models/interfaces/IConsejoMiembro";
import { IDocente } from "models/interfaces/IDocente";
import { IDocumento } from "models/interfaces/IDocumento";
import {
  IEstudiante,
  MultipleStudentForm,
} from "models/interfaces/IEstudiante";
import { IProceso } from "models/interfaces/IProceso";
import { ITipoConsejo } from "models/interfaces/ITipoConsejo";
import { read, utils } from "xlsx";
import { CONSTANTS } from "./constants";
import { parseToDateTime } from "./date";

export const DRAWERWIDTH = 240;
const { FORMATO_FECHA_NACIMIENTO: FORMATO_FECHA } = CONSTANTS;

export type CleanOptions = {
  cleanKeys?: string[];
  cleanValues?: any[];
  emptyArrays?: boolean;
  emptyObjects?: boolean;
  emptyStrings?: boolean;
  NaNValues?: boolean;
  nullValues?: boolean;
  undefinedValues?: boolean;
};

export function clean(
  object: Record<string, any>,
  options?: CleanOptions
): Record<string, any> {
  const {
    cleanKeys = [],
    cleanValues = [],
    emptyArrays = true,
    emptyObjects = true,
    emptyStrings = true,
    NaNValues = false,
    nullValues = true,
    undefinedValues = true,
  } = options || {};

  return transform(object, (result, value, key) => {
    // Exclude specific keys.
    if (cleanKeys.includes(key)) {
      return;
    }

    // Recurse into arrays and objects.
    if (Array.isArray(value) || isPlainObject(value)) {
      value = clean(value, options);
    }

    // Exclude specific values.
    if (cleanValues.includes(value)) {
      return;
    }

    // Exclude empty objects.
    if (emptyObjects && isPlainObject(value) && isEmpty(value)) {
      return;
    }

    // Exclude empty arrays.
    if (emptyArrays && Array.isArray(value) && !value.length) {
      return;
    }

    // Exclude empty strings.
    if (emptyStrings && value === "") {
      return;
    }

    // Exclude NaN values.
    if (NaNValues && Number.isNaN(value)) {
      return;
    }

    // Exclude null values.
    if (nullValues && value === null) {
      return;
    }

    // Exclude undefined values.
    if (undefinedValues && value === undefined) {
      return;
    }

    // Append when recursing arrays.
    if (Array.isArray(result)) {
      return result.push(value);
    }

    result[key] = value;
  });
}

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
  J: string;
  K: string;
};

const cleanFields = (data: string | null | undefined): string => {
  return !data ? "" : data.length === 1 ? "" : data;
};

function cleanFN(data: any) {
  try {
    let fecha_nacimiento: Date | null = null;

    if (typeof data === "number") {
      fecha_nacimiento = new Date(
        Math.round((data - (25567 + 1)) * 86400 * 1000)
      );
    } else if (typeof data === "string") {
      fecha_nacimiento = parseISO(data);
    }

    let result = "";

    if (fecha_nacimiento && isValid(fecha_nacimiento)) {
      result = format(fecha_nacimiento, FORMATO_FECHA);
    }

    return result;
  } catch (error) {
    return "";
  }
}

function cleanG(data: any) {
  if (typeof data === "string") {
    data = data.toUpperCase();

    return [Genero.FEMENINO, Genero.MASCULINO].includes(data) ? data : "";
  } else {
    return "";
  }
}

export async function readFile(file: File): Promise<MultipleStudentForm[]> {
  try {
    const data = await file.arrayBuffer();

    const workbook = read(data);

    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const parseData = utils.sheet_to_json<SheetType>(sheet, {
      header: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"],
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
        genero: cleanG(element["J"]),
        fecha_nacimiento: cleanFN(element["K"]),
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

export function getConsejo(params: GridValueGetterParams<IDocumento>) {
  return params.row.consejo.nombre;
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

export function getOptionLabelDocente2(option: IDocente) {
  return option.nombres;
}

function getAutocompleteDocente(option: string | IDocente) {
  return typeof option === "string" ? option : getOptionLabelDocente2(option);
}

export function isOptionEqualToValueDocente(o: IDocente, v: IDocente) {
  return o.id === v.id;
}

export function getOptionLabelDocente(option: string | IDocente) {
  return getAutocompleteDocente(option);
}

function getAutocompleteCanton(value: ICanton) {
  const {
    nombre: nombreCO,
    provincia: { nombre: nombrePO },
  } = value;
  return `${nombreCO} - ${nombrePO}`;
}

export function isOptionEqualToValueCanton(option: ICanton, value: ICanton) {
  return getAutocompleteCanton(option) === getAutocompleteCanton(value);
}

export function getOptionLabelCanton(option: ICanton) {
  return getAutocompleteCanton(option);
}

function getAutocompleteAula(option: IAula) {
  return option.nombre;
}

export function isOptionEqualToValueAula(option: IAula, value: IAula) {
  return getAutocompleteAula(option) === getAutocompleteAula(value);
}

export function getOptionLabelAula(option: IAula) {
  return getAutocompleteAula(option);
}

function getAutocompleteEstudiante(option: IEstudiante) {
  const {
    cedula,
    nombres,
    apellidos,
    carrera: { nombre: nombreCarrera },
  } = option;

  const nombreCompleto = [nombres, apellidos].join(" ");

  return `${cedula} - ${nombreCompleto} - ${nombreCarrera}`;
}

export function isOptionEqualToValueEstudiante(
  option: IEstudiante,
  value: IEstudiante
) {
  return getAutocompleteEstudiante(option) === getAutocompleteEstudiante(value);
}

export function getOptionLabelEstudiante(option: IEstudiante) {
  return getAutocompleteEstudiante(option);
}

export function getLocalStoragePreviousValue(
  key: LocalStorageKeys,
  defaultValue = -1
) {
  const previousValueSelected = localStorage.getItem(key);

  return previousValueSelected ? +previousValueSelected : defaultValue;
}

export function testFechaSustentacion(v: any, c: any) {
  if (!v || v === -1) {
    return true;
  }
  const { fecha_presentacion } = c.parent;
  return Boolean(fecha_presentacion);
}

export function getTooltipTextNotification(
  notificado: boolean,
  type: "w" | "e"
): string {
  if (type === "w") {
    return !notificado ? "Notificar vía WhatsApp" : "Renotificar vía WhatsApp";
  } else if (type === "e") {
    return !notificado ? "Notificar vía Correo" : "Renotificar vía Correo";
  } else {
    return "";
  }
}
