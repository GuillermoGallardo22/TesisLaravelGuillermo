import { IModalidadActaGrado } from "models/interfaces/IModalidadActaGrado";
import { useQuery } from "react-query";
import { getModalidadesActaGrado } from "services/modalidadActaGrado";

type useModalidadActasListProps = {
  useQueryOptions?: {
    refetchOnWindowFocus?: boolean;
  };
};

export function useModalidadActasList(props?: useModalidadActasListProps) {
  const { data: modalidades = [], isLoading } = useQuery<IModalidadActaGrado[]>(
    ["modalidad-actas"],
    () => getModalidadesActaGrado(),
    {
      refetchOnWindowFocus: props?.useQueryOptions?.refetchOnWindowFocus,
    }
  );

  return {
    modalidades,
    isLoading,
  };
}
