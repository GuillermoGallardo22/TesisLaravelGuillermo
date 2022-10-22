import axios from "axios";
import { IModalidadActaGrado } from "models/interfaces/IModalidadActaGrado";

export async function getModalidadesActaGrado(): Promise<
  IModalidadActaGrado[]
> {
  try {
    const {
      data: { data },
    } = await axios.get("modalidades-acta-grado");

    return data;
  } catch (error) {
    return [];
  }
}
