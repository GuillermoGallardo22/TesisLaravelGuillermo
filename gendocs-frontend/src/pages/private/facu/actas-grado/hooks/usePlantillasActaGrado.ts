import { ITipoActaGrado } from "models/interfaces";
import { useQuery } from "react-query";
import { getTipoActasGrado } from "services";

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
