import { ITipoActaGrado } from "models/interfaces/IActaGrado";
import { useQuery } from "react-query";
import { getTipoActasGrado } from "services/tipoActasGrado";

export function usePlantillasActaGrado() {
  const { data: plantillas = [], isLoading } = useQuery<ITipoActaGrado[]>(
    ["plantillas-acta-grado"],
    () => getTipoActasGrado()
  );

  return {
    plantillas,
    isLoading,
  };
}
