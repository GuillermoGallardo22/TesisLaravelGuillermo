import React from "react";
import {Link as RouterLink} from "react-router-dom";
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";

interface LinkProps {
    path: string,
    label: string,
    icon: any,
}

const Link: React.FC<LinkProps> = ({path, label, icon}) => {
    return (
        <ListItem
            button
            to={path}
            component={RouterLink}
        >
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            < ListItemText
                primary={label}
            />
        </ListItem>
    );
};

export default Link;
