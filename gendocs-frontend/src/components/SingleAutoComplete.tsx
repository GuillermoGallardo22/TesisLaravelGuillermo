import { UseAutocompleteProps as UseAutocompletePropsBase } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useAutocomplete, useAutocompleteProps } from "hooks/useAutocomplete";
import { useEffect } from "react";

type UseAutocompleteProps<T> = Pick<
  UseAutocompletePropsBase<T, undefined, undefined, undefined>,
  "id" | "isOptionEqualToValue" | "getOptionLabel" | "disabled"
>;

interface SingleAutoCompleteProps<T> {
  value: T | null;
  onChange: React.Dispatch<React.SetStateAction<T | null>>;
  hookProps: useAutocompleteProps<T>;
  AutoCompleteProps: UseAutocompleteProps<T>;
  TextFieldProps: TextFieldProps;
}

export function SingleAutoComplete<T>(props: SingleAutoCompleteProps<T>) {
  const { hookProps, AutoCompleteProps, TextFieldProps, onChange, value } =
    props;

  const {
    items,
    isOpen,
    openModal,
    closeModal,
    searching,
    value: currentValue,
    onChange: onChangeCurrentValue,
    onInputChange,
    resetValue,
  } = useAutocomplete(hookProps);

  useEffect(() => {
    onChange(currentValue);
  }, [currentValue]);

  useEffect(() => {
    if (!value) {
      resetValue();
    }
  }, [value]);

  return (
    <Autocomplete
      fullWidth
      {...AutoCompleteProps}
      open={isOpen}
      onOpen={openModal}
      onClose={closeModal}
      options={items}
      loading={searching}
      filterOptions={(x) => x}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={currentValue}
      onChange={onChangeCurrentValue}
      onInputChange={onInputChange}
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
