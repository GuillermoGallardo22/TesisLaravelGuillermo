import "@mui/material/styles";

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

// Update the Button's color prop options
declare module "@mui/material/AppBar" {
    interface AppBarPropsColorOverrides {
        uta: true;
    }
}
