import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import { useAuthContext } from "contexts/AuthContext";
import { routes } from "layout/routes";
import Link from "./Link";

const drawerWidth = 240;

const DrawerBase = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: "border-box",
        ...(!open && {
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing(9),
            },
        }),
    },
}));

interface DrawerProps {
    open: boolean;
    toggleDrawer: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ open, toggleDrawer }) => {
    const {
        context: { user },
    } = useAuthContext();

    return (
        <DrawerBase variant="permanent" open={open}>
            <Toolbar
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: [1],
                }}
            >
                <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            <List>
                {routes
                    .filter((i) => !i.roles || i?.roles.includes(user.roles[0]))
                    .map(
                        (item) =>
                            item.icon &&
                            item.label && (
                                <Link
                                    key={item.path}
                                    icon={item.icon}
                                    label={item.label}
                                    path={item.path}
                                />
                            )
                    )}
            </List>
        </DrawerBase>
    );
};

export default Drawer;
