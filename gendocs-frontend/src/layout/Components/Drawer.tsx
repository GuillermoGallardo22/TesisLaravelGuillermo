import React from "react";
import {experimentalStyled as styled} from "@material-ui/core/styles";
import MuiDrawer from "@material-ui/core/Drawer";
import {
    Divider,
    IconButton,
    List,
    ListSubheader,
    Toolbar
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import {getAdminLinks, getUserLinks} from "../Routes";
import {useAuthContext} from "contexts/AuthContext";
import Link from "./Link";

import Logo from "../../assets/img/sello.png";

const drawerWidth = 240;

const DrawerBase = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== "open"})(
    ({theme, open}) => ({
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
    }),
);

interface DrawerProps {
    open: boolean,
    toggleDrawer: () => void,
}

const Drawer: React.FC<DrawerProps> = ({open, toggleDrawer}) => {

    const {auth: {user}} = useAuthContext();

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
                <img src={Logo} height={64}/>

                <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon/>
                </IconButton>
            </Toolbar>
            <Divider/>
            <List>
                {
                    getUserLinks(user.profile).map(item => (
                        <Link
                            key={item.path}
                            icon={item.icon}
                            label={item.label}
                            path={item.path}
                        />
                    ))
                }
            </List>
            <Divider/>
            <ListSubheader inset>Administración</ListSubheader>

            {
                getAdminLinks(user.profile).map(item => (
                    <Link
                        key={item.path}
                        icon={item.icon}
                        label={item.label}
                        path={item.path}
                    />
                ))
            }
        </DrawerBase>
    );
};

export default Drawer;
