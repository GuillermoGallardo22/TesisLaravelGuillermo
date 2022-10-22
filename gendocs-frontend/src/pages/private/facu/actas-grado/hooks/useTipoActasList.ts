import { ITipoActaGrado } from "models/interfaces/IActaGrado";
import { useQuery } from "react-query";
import { getTipoActasGrado } from "services/tipoActasGrado";

export function useTipoActasList() {
  const { data: tiposActas = [], isLoading } = useQuery<ITipoActaGrado[]>(
    ["tipo-actas"],
    () => getTipoActasGrado()
  );

  return {
    tiposActas,
    isLoading,
  };
}
