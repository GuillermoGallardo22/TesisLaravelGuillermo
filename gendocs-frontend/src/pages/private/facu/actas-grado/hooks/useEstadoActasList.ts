import { IEstadoActa } from "models/interfaces/IActaGrado";
import { useQuery } from "react-query";
import { getEstadoActasGrado } from "services/estadoActasGrado";

type useEstadoActasListProps = {
  useQueryOptions?: {
    refetchOnWindowFocus?: boolean;
  };
};

export function useEstadoActasList(props?: useEstadoActasListProps) {
  const { data: estadoActas = [], isLoading } = useQuery<IEstadoActa[]>(
    ["estado-actas"],
    () => getEstadoActasGrado(),
    {
      refetchOnWindowFocus: props?.useQueryOptions?.refetchOnWindowFocus,
    }
  );

  return {
    estadoActas,
    isLoading,
  };
}
