import { esES as coreEsES } from "@mui/material/locale";
import { esES as tableEsES } from "@mui/x-data-grid";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme(
    {
        palette: {
            uta: {
                main: "#7a1e19",
                contrastText: "#fff",
            },
        },
    },
    tableEsES,
    coreEsES
);
