import { useQuery } from "react-query";
import { getDocentes } from "services/docentes";

export function useListDocentes() {
    const { data: docentes = [], isLoading } = useQuery(
        ["docentes"],
        getDocentes
    );

    return {
        docentes,
        isLoading,
    };
}
