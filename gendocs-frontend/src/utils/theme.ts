import { esES as coreEsES } from "@mui/material/locale";
import { createTheme } from "@mui/material/styles";
import { esES as tableEsES } from "@mui/x-data-grid";

declare module "@mui/material/styles" {
    interface Palette {
        uta: Palette["primary"];
    }

    // allow configuration using `createTheme`
    interface PaletteOptions {
        uta?: PaletteOptions["primary"];
    }
}

// Update the Button's color prop options
declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
        uta: true;
    }
}

export const theme = createTheme(
    {
        palette: {
            uta: {
                main: "#7a1e19",
                contrastText: "#fff",
            },
        },
    },
    coreEsES,
    tableEsES
);
