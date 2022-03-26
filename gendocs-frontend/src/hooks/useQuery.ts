import { IConsejo } from "models/interfaces";
import { useQuery, UseQueryResult } from "react-query";
import { getConsejos } from "services/consejos";

/**
 * Retorna consejos activos
 * @returns {UseQueryResult<IConsejo[], unknown>}
 */
export function useConsejos(): UseQueryResult<IConsejo[]> {
    return useQuery(
        ["consejos"],
        () =>
            getConsejos({
                filters: {
                    estado: 1,
                },
            }),
        {
            select: (d) => d.data,
        }
    );
}
