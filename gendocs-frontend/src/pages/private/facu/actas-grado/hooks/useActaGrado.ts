import { useQuery } from "react-query";
import { getActaGrado } from "services";

const useActaGrado = (actaGradoId: string) => {
  const { data: actaGrado, isLoading: isLoadingActaGrado } = useQuery(
    ["acta-grado", actaGradoId],
    () => getActaGrado(actaGradoId).then((r) => r.data)
  );

  // const { data: miembros = [], isLoading } = useQuery(
  //   ["consejos-miembros", consejo?.id],
  //   () =>
  //     getMiembros({
  //       filters: {
  //         consejo: consejoId,
  //       },
  //     }),
  //   {
  //     enabled: Boolean(consejo),
  //   }
  // );

  return {
    // miembros,
    // isLoading,
    isLoadingActaGrado,
    actaGrado,
  };
};

export default useActaGrado;
