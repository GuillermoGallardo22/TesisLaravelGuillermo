import {
    GridValueFormatterParams,
    GridValueGetterParams,
} from "@mui/x-data-grid";
import { IDocente, IDocumento, IProceso } from "models/interfaces";
import { MultipleStudentForm } from "pages/private/student/hooks/useAddStudent";
import * as xlsx from "xlsx";
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

        const workbook = xlsx.read(data);

        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        const parseData = xlsx.utils.sheet_to_json<SheetType>(sheet, {
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
    return [
        params.row.estudiante.apellidos,
        params.row.estudiante.nombres,
    ].join(" ");
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

export function generateLink(data: IDocumento, user: string) {
    const celular = data?.estudiante?.celular;

    if (!celular) return "";

    const text = `Me permito notificar a usted que su trámite ${
        data.plantilla.nombre
    } del proceso de ${
        (data.plantilla.proceso as IProceso).nombre
    } ha sido atendido. Pronto será despachado a su correo institucional.

    Atentamente,
    ${user}
    Secretaria FISEI`;

    const params = parseObjectToQueryParams({
        phone: "+593" + celular.substring(1),
        text,
    });

    return `https://api.whatsapp.com/send?${encodeURI(params)}`;
}
