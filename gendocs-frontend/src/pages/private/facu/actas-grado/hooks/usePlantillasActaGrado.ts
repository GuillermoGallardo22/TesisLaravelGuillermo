import { ITipoActaGrado } from "models/interfaces/IActaGrado";
import { IFilterPaginationProps } from "models/interfaces/IPagination";
import { useQuery } from "react-query";
import { getTipoActasGrado } from "services/tipoActasGrado";

export function usePlantillasActaGrado(props?: IFilterPaginationProps) {
  const { data: plantillas = [], isLoading } = useQuery<ITipoActaGrado[]>(
    ["plantillas-acta-grado"],
    () => getTipoActasGrado(props)
  );

  return {
    plantillas,
    isLoading,
  };
}
