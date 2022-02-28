import {
    IconButton as IconButtonBase,
    IconButtonProps as IconButtonBaseProps,
    Tooltip,
} from "@mui/material";
import React from "react";
import Icon, { IconTypes } from "./Icon";

interface IconButtonProps {
    tooltipText: string;
    icon: IconTypes;
}

const IconButton: React.FC<IconButtonProps & IconButtonBaseProps> = ({
    tooltipText,
    icon,
    ...props
}) => {
    return tooltipText ? (
        <Tooltip title={tooltipText}>
            <IconButtonBase {...props}>
                <Icon icon={icon} />
            </IconButtonBase>
        </Tooltip>
    ) : (
        <IconButtonBase {...props}>
            <Icon icon={icon} />
        </IconButtonBase>
    );
};

export default IconButton;
