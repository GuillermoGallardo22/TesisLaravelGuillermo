import { ICarrera } from "models/interfaces";
import { useQuery } from "react-query";
import { getAllCarreras } from "services/carreras";

export function useListCarreras() {
    const { data: carreras = [], isLoading } = useQuery<ICarrera[]>(
        ["facultades"],
        () => getAllCarreras()
    );

    return {
        carreras,
        isLoading,
    };
}
