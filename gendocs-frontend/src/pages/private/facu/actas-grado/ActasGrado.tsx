import Stack from "@mui/material/Stack";
import { Icon, TitleNav } from "components";

import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const ActasGrado: React.FunctionComponent = () => {
  return (
    <Stack spacing={2}>
      <TitleNav title="Actas de grado" goback={false} />
      <Button
        component={Link}
        startIcon={<Icon icon="add" />}
        to="nuevo"
        variant="outlined"
      >
        AÑADIR
      </Button>
    </Stack>
  );
};

export default ActasGrado;
