import axios from "axios";
import { ICarrera } from "models/interfaces";

export async function getAllCarreras(): Promise<ICarrera[]> {
    try {
        const { data } = await axios.get<ICarrera[]>("carreras");
        return data;
    } catch (error) {
        return [];
    }
}
