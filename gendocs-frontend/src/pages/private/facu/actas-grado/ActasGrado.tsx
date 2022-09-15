import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { Icon, TitleNav } from "components";

import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const ActasGrado: React.FunctionComponent = () => {
  return (
    <Stack spacing={2}>
      <TitleNav title="Actas de grado" goback={false} />

      <Box>
        <Grid container columns={{ xs: 1, sm: 2 }} spacing={2}>
          <Grid item xs={1}>
            <Button
              fullWidth
              component={Link}
              startIcon={<Icon icon="add" />}
              to="nuevo"
              variant="outlined"
            >
              AÑADIR
            </Button>
          </Grid>

          <Grid item xs={1}>
            <Button
              fullWidth
              component={Link}
              startIcon={<Icon icon="article" />}
              to="plantillas"
              variant="outlined"
            >
              PLANTILLAS
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};

export default ActasGrado;
