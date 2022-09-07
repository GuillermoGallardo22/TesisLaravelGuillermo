import { UseAutocompleteProps as UseAutocompletePropsBase } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { useAutocompleteProps, useMultiAutocomplete } from "hooks";
import { useEffect } from "react";

type UseAutocompleteProps<T> = Pick<
  UseAutocompletePropsBase<T, undefined, undefined, undefined>,
  "id" | "isOptionEqualToValue" | "disabled"
> & {
  getOptionLabel: (option: string | T) => string;
};

export interface MultipleAutoCompleteProps<T> {
  values: T[];
  onChange: React.Dispatch<React.SetStateAction<T[]>>;
  hookProps: useAutocompleteProps<T>;
  AutoCompleteProps: UseAutocompleteProps<T>;
  TextFieldProps: {
    label: string;
    placeholder: string;
  };
  ChipProps: {
    getOptionLabel: (option: T) => string;
  };
}

export function MultipleAutoComplete<T>(props: MultipleAutoCompleteProps<T>) {
  const {
    hookProps,
    AutoCompleteProps,
    ChipProps,
    TextFieldProps,
    values,
    onChange,
  } = props;

  const {
    values: currentValue,
    options,
    searching,
    setOptions,
    setInputValue,
    setValues,
    resetValues,
  } = useMultiAutocomplete<T>(hookProps);

  useEffect(() => {
    onChange(currentValue);
  }, [currentValue.length]);

  useEffect(() => {
    if (!values.length) {
      resetValues();
    }
  }, [values.length]);

  return (
    <Autocomplete
      {...AutoCompleteProps}
      //
      freeSolo
      multiple
      fullWidth
      autoComplete
      includeInputInList
      filterSelectedOptions
      options={options}
      value={currentValue}
      filterOptions={(x) => x}
      onClose={() => setOptions([])}
      onChange={(_, newValue: any) => setValues(newValue)}
      onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => {
          const label = ChipProps.getOptionLabel(option);
          return <Chip label={label} {...getTagProps({ index })} key={index} />;
        })
      }
      renderInput={(params) => (
        <TextField
          {...params}
          {...TextFieldProps}
          margin="normal"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {searching ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
