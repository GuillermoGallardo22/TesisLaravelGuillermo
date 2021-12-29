import { MultipleStudentForm } from "pages/private/student/hooks/useAddStudent";
import xlsx from "xlsx";

type SheetType = {
    A: string,
    B: string,
    C: string,
    D: string,
    E: string,
    F: string,
    G: string,
    H: string,
    I: string,
};

const cleanFields = (data: string | null | undefined): string => {
    return !data ? "" :
        data.length === 1 ? "" : data;
};

export async function readFile(file: File): Promise<MultipleStudentForm[]> {
    try {

        const data = await file.arrayBuffer();

        const workbook = xlsx.read(data);

        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        const parseData = xlsx.utils.sheet_to_json<SheetType>(sheet, {
            header: ["A", "B", "C", "D", "E", "F", "G", "H", "I"]
        });

        const students = parseData
            .slice(1)
            .map<MultipleStudentForm>((element, index) => (
                {
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
                }
            ));

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

