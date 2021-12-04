import React from "react";
import MuiAppBar from "@material-ui/core/AppBar";
import {AppBarProps as MuiAppBarProps} from "@material-ui/core/AppBar/AppBar";
import {experimentalStyled as styled} from "@material-ui/core/styles";
import {Badge, IconButton, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import useAuth from "hooks/useAuth";

const drawerWidth = 240;

interface AppBarStyleProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBarStyle = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarStyleProps>(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

interface AppBarProps {
    open: boolean,
    toggleDrawer: () => void,
}

const AppBar: React.FC<AppBarProps> = ({open, toggleDrawer}) => {

    const {
        logOut,
    } = useAuth();

    return (
        <AppBarStyle position="absolute" open={open}>
            <Toolbar
                sx={{
                    pr: "24px", // keep right padding when drawer closed
                }}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{
                        marginRight: "36px",
                        ...(open && {display: "none"}),
                    }}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{flexGrow: 1}}
                >
                    Panel de Administración
                </Typography>

                <IconButton color="inherit" onClick={() => logOut()}>
                    <ExitToAppIcon/>
                </IconButton>
            </Toolbar>
        </AppBarStyle>
    );
};

export default AppBar;
