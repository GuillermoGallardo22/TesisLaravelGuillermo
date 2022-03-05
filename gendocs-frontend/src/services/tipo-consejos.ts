import axios from "axios";

export async function getTipoConsejos() {
    try {
        const {
            data: { data },
        } = await axios.get("tipo-consejos");

        return data;
    } catch (error) {
        return [];
    }
}
