import {
    FormControl,
    InputLabel,
    MenuItem,
    FormHelperText,
    Select as SelectBase,
    SelectChangeEvent,
} from "@mui/material";
import React from "react";

interface SelectProps {
    error?: boolean;
    id: string;
    name: string;
    label: string;
    value: string | number;
    onChange: (
        event: SelectChangeEvent<string | number>,
        child: React.ReactNode
    ) => void;
    items: { id: number; label: string }[];
    errorMessage?: any;
    autoFocus?: boolean;
    required?: boolean;
    disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
    id,
    name,
    label,
    value,
    items,
    onChange,
    error,
    errorMessage,
    autoFocus,
    required,
    disabled = false,
}) => {
    return (
        <FormControl
            fullWidth
            disabled={disabled}
            error={error}
            margin="normal"
        >
            <InputLabel required={required} id={id}>
                {label}
            </InputLabel>
            <SelectBase
                required={required}
                autoFocus={autoFocus}
                id={id}
                name={name}
                labelId={id}
                value={items.length === 0 ? -1 : value}
                label={label}
                onChange={onChange}
                defaultValue={-1}
            >
                <MenuItem value={-1}>Seleccionar...</MenuItem>
                {items.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                        {item.label}
                    </MenuItem>
                ))}
            </SelectBase>

            {(error || Boolean(errorMessage)) && (
                <FormHelperText>{errorMessage}</FormHelperText>
            )}
        </FormControl>
    );
};

export default Select;
