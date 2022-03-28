import { useState } from "react";

export const useErrorsResponse = () => {
  const [errorSummary, setErrorSummary] = useState<string[] | undefined>();

  return {
    errorSummary,
    setErrorSummary,
    cleanErrorsSumary: () => setErrorSummary(undefined),
  };
};
