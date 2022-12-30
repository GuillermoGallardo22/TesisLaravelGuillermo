import { ITipoActaGrado } from "models/interfaces/IActaGrado";
import { useQuery } from "react-query";
import { getTipoActasGrado } from "services/tipoActasGrado";

type useTipoActasListProps = {
  useQueryOptions?: {
    refetchOnWindowFocus?: boolean;
  };
};

export function useTipoActasList(props?: useTipoActasListProps) {
  const { data: tiposActas = [], isLoading } = useQuery<ITipoActaGrado[]>(
    ["tipo-actas"],
    () => getTipoActasGrado(),
    {
      refetchOnWindowFocus: props?.useQueryOptions?.refetchOnWindowFocus,
    }
  );

  return {
    tiposActas,
    isLoading,
  };
}
