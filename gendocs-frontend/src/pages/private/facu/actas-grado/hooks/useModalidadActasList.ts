import { IModalidadActaGrado } from "models/interfaces";
import { useQuery } from "react-query";
import { getModalidadesActaGrado } from "services";

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
