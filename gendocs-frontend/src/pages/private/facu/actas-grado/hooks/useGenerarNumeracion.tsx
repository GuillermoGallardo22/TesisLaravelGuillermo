import { useHandleResult } from "hooks/useHandleResult";
import { HTTP_STATUS } from "models/enums/HttpStatus";
import { useState } from "react";
import { generarNumeracionActasGrado } from "services/actas-grado";

type useGenerarNumeracionProps = {
  carreraId: number;
  callback?: () => void;
};

export const useGenerarNumeracion = ({
  carreraId,
  callback,
}: useGenerarNumeracionProps) => {
  const [generating, setGenerating] = useState(false);
  const { handleResult } = useHandleResult();

  const handleGenerarNumeracion = async () => {
    setGenerating(true);

    const result = await generarNumeracionActasGrado(carreraId);

    handleResult({
      result: result,
      status: HTTP_STATUS.ok,
    });

    if (callback) {
      callback();
    }

    setGenerating(false);
  };

  return { handleGenerarNumeracion, generating };
};
