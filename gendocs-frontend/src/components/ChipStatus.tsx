import { Chip, ChipProps } from "@mui/material";

interface ChipStatusProps extends ChipProps {
    value: boolean;
}

const ChipStatus: React.FC<ChipStatusProps> = ({
    children,
    value,
    ...props
}) => {
    return (
        <Chip
            label={value ? "Activado" : "Desactivado"}
            color={value ? "primary" : "error"}
            {...props}
        >
            {children}
        </Chip>
    );
};

export default ChipStatus;
