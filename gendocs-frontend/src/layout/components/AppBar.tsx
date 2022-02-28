import Icon from "components/Icon";
import { IconButton, Toolbar, Typography } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import { useAuth } from "hooks/useAuth";

const drawerWidth = 240;

interface AppBarStyleProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBarStyle = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarStyleProps>(({ theme, open }) => ({
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
    open: boolean;
    toggleDrawer: () => void;
}

const AppBar: React.FC<AppBarProps> = ({ open, toggleDrawer }) => {
    const { logout } = useAuth();

    return (
        <AppBarStyle color="uta" position="absolute" open={open}>
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
                        ...(open && { display: "none" }),
                    }}
                >
                    <Icon icon="menu" />
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    FISEI
                </Typography>

                <IconButton color="inherit" onClick={logout}>
                    <Icon icon="exitToApp" />
                </IconButton>
            </Toolbar>
        </AppBarStyle>
    );
};

export default AppBar;
