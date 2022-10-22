import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ItemProps as ItemPropsBase, SelectProps } from "./Select";

type ItemProps = {
  id: number;
} & Omit<ItemPropsBase, "id">;

type SelectMultiProps = {
  onChange: (ids: number[]) => void;
  values: number[];
  items: ItemProps[];
} & Omit<SelectProps, "onChange" | "value" | "items">;

export function SelectMulti({
  onChange,
  items,
  id,
  label,
  name,
  required,
  error,
  errorMessage,
  disabled,
  values,
}: SelectMultiProps) {
  const handleChange = (event: SelectChangeEvent<number[]>) => {
    const {
      target: { value },
    } = event;

    const ids =
      typeof value === "string" ? value.split(",").map((id) => +id) : value;

    onChange(ids);
  };

  return (
    <FormControl fullWidth disabled={disabled} error={error} margin="normal">
      <InputLabel required={required} id={id}>
        {label}
      </InputLabel>
      <Select
        required={required}
        id={id}
        name={name}
        labelId={id}
        label={label}
        multiple
        value={values}
        onChange={handleChange}
        MenuProps={MenuProps}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {items
              .filter((item) => selected.includes(item.id))
              .map((value) => (
                <Chip key={value.id} label={value.label} size="small" />
              ))}
          </Box>
        )}
      >
        {items.map((m) => (
          <MenuItem key={m.id} value={m.id}>
            <Checkbox checked={values.indexOf(m.id) > -1} />
            <ListItemText primary={m.label} />
          </MenuItem>
        ))}
      </Select>

      {(error || Boolean(errorMessage)) && (
        <FormHelperText>{errorMessage}</FormHelperText>
      )}
    </FormControl>
  );
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
