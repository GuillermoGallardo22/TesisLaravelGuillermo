import { PlantillasGlobales } from "models/enums";
import { IConsejo, IFilterPaginationProps } from "models/interfaces";
import { IPlantillaGlobal } from "models/interfaces/IPlantillaGlobal";
import { useQuery, UseQueryResult } from "react-query";
import { getConsejos } from "services";
import { getPlantillaGlobalByCode } from "services/plantillasGlobales";

/**
 * Retorna consejos activos
 * @returns {UseQueryResult<IConsejo[], unknown>}
 */
export function useConsejos(
  props?: IFilterPaginationProps
): UseQueryResult<IConsejo[]> {
  return useQuery(
    ["consejos"],
    () =>
      getConsejos({
        filters: {
          ...props?.filters,
          estado: 1,
        },
      }),
    {
      select: (d) => d.data,
    }
  );
}

export function usePlantillasGlob(
  codigo: PlantillasGlobales
): UseQueryResult<IPlantillaGlobal | null> {
  return useQuery(["plantillas-globales", { code: codigo }], () =>
    getPlantillaGlobalByCode({
      filters: {
        codigo,
      },
    })
  );
}
