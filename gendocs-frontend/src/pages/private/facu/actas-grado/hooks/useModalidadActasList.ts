import { IModalidadActaGrado } from "models/interfaces/IModalidadActaGrado";
import { useQuery } from "react-query";
import { getModalidadesActaGrado } from "services/modalidadActaGrado";

export function useModalidadActasList() {
  const { data: modalidades = [], isLoading } = useQuery<IModalidadActaGrado[]>(
    ["modalidad-actas"],
    () => getModalidadesActaGrado()
  );

  return {
    modalidades,
    isLoading,
  };
}
