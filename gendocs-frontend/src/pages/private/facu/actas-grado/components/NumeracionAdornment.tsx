import { CircularProgress, IconButton, InputAdornment } from "@mui/material";
import Icon from "components/Icon";

type NumeracionAdornmentProps = {
  loading: boolean;
  disabled: boolean;
  refresh: React.MouseEventHandler<HTMLButtonElement>;
  edit: React.MouseEventHandler<HTMLButtonElement>;
};

const NumeracionAdornment: React.FunctionComponent<
  NumeracionAdornmentProps
> = ({ loading, disabled, refresh, edit }) => {
  const preventDefault = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  if (loading) return <CircularProgress color="inherit" size={20} />;

  return (
    <>
      <InputAdornment position="end">
        <IconButton
          onClick={edit}
          onMouseDown={preventDefault}
          edge="end"
          disabled={disabled}
        >
          <Icon icon="edit" />
        </IconButton>
      </InputAdornment>

      <InputAdornment position="end">
        <IconButton
          onClick={refresh}
          onMouseDown={preventDefault}
          edge="end"
          disabled={disabled}
        >
          <Icon icon="autorenew" />
        </IconButton>
      </InputAdornment>
    </>
  );
};

export default NumeracionAdornment;
