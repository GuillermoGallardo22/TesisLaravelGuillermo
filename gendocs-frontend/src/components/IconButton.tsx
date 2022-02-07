import AddIcon from "@mui/icons-material/Add";
import ArticleIcon from "@mui/icons-material/Article";
import EditIcon from "@mui/icons-material/Edit";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import {
    IconButton as IconButtonBase,
    IconButtonProps as IconButtonBaseProps,
    Tooltip,
} from "@mui/material";
import React from "react";

type IconTypes = "article" | "edit" | "add" | "move";

interface IconButtonProps {
    tooltipText: string;
    icon: IconTypes;
}

const IconButton: React.FC<IconButtonProps & IconButtonBaseProps> = ({
    tooltipText,
    icon,
    ...props
}) => {
    const renderIcon = () => {
        const ICONS = {
            article: <ArticleIcon />,
            edit: <EditIcon />,
            add: <AddIcon />,
            move: <DriveFileMoveIcon />,
        };

        return ICONS[icon];
    };

    return tooltipText ? (
        <Tooltip title={tooltipText}>
            <IconButtonBase {...props}>{renderIcon()}</IconButtonBase>
        </Tooltip>
    ) : (
        <IconButtonBase {...props}>{renderIcon()}</IconButtonBase>
    );
};

export default IconButton;
