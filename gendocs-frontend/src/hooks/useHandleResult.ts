import { HTTP_STATUS } from "models/enums/HttpStatus";
import { IResponse } from "models/interfaces/IResponse";
import { useSnackbar } from "notistack";

type useHandleResultProps<T> = {
  result: IResponse<T>;
  status: HTTP_STATUS;
  onSuccess?: (result: IResponse<T>) => void;
  onError?: (result: IResponse<T>) => void;
};

export function useHandleResult<T>() {
  const { enqueueSnackbar } = useSnackbar();

  const handleResult = ({
    result,
    status,
    onError,
    onSuccess,
  }: useHandleResultProps<T>) => {
    if (result.status === status) {
      if (onSuccess) {
        onSuccess(result);
      }
      enqueueSnackbar(result.message, { variant: "success" });
    } else {
      if (onError) {
        onError(result);
      }
      const { message, errors } = result;

      if (errors?.length === 1) {
        enqueueSnackbar(errors, { variant: "error" });
      } else {
        enqueueSnackbar(message, { variant: "error" });
      }
    }
  };

  return { handleResult };
}
