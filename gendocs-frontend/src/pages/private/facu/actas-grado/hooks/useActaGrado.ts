import { useQuery } from "react-query";
import { getActaGrado, getMiembrosActaGrado } from "services";

const useActaGrado = (actaGradoId: string) => {
  const { data: actaGrado, isLoading: isLoadingActaGrado } = useQuery(
    ["acta-grado", actaGradoId],
    () => getActaGrado(actaGradoId).then((r) => r.data)
  );

  const { data: miembros = [], isLoading: isLoadingMiembros } = useQuery(
    ["miembros-acta-grados", actaGradoId],
    () =>
      getMiembrosActaGrado({
        filters: {
          actaGrado: actaGradoId,
        },
      }),
    {
      enabled: Boolean(actaGrado),
    }
  );

  return {
    miembros,
    isLoadingMiembros,
    isLoadingActaGrado,
    actaGrado,
  };
};

export default useActaGrado;
