import Chip, { ChipProps } from "@mui/material/Chip";

type ChipColors =
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";

interface ChipStatusProps extends ChipProps {
    value: boolean;
    textPrimary?: string;
    textSecondary?: string;
    colorPrimary?: ChipColors;
    colorSecondary?: ChipColors;
}

const ChipStatus: React.FC<ChipStatusProps> = ({
    children,
    value,
    textPrimary = "Activado",
    textSecondary = "Desactivado",
    colorPrimary = "primary",
    colorSecondary = "error",
    ...props
}) => {
    return (
        <Chip
            label={value ? textPrimary : textSecondary}
            color={value ? colorPrimary : colorSecondary}
            {...props}
        >
            {children}
        </Chip>
    );
};

export default ChipStatus;
