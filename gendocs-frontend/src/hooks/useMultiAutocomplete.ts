import throttle from "lodash/throttle";
import { IFilterPaginationProps } from "models/interfaces/IPagination";
import { useEffect, useMemo, useState } from "react";
import { useAutocompleteProps } from "./useAutocomplete";

export function useMultiAutocomplete<T>({
  fetch,
  filters,
}: useAutocompleteProps<T>) {
  const [values, setValues] = useState<T[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<readonly T[]>([]);
  const [searching, setSearching] = useState(false);

  const handleFetch = async (
    request: IFilterPaginationProps,
    callback: (results?: readonly T[]) => void
  ) => {
    const result = await fetch(request);
    callback(result);
  };

  const fetchThrottled = useMemo(() => throttle(handleFetch, 1500), []);

  useEffect(() => {
    let active = true;

    if (inputValue === "") {
      return;
    }

    setSearching(true);

    fetchThrottled(
      {
        filters: {
          search: inputValue,
          ...filters,
        },
        pagination: {
          size: 10,
        },
      },
      (results) => {
        if (!active) return;

        let newOptions: readonly any[] = [];

        if (values) {
          newOptions = [values];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
        setSearching(false);
      }
    );

    return () => {
      active = false;
    };
  }, [values, inputValue, fetchThrottled]);

  const resetValues = () => {
    setValues([]);
    setOptions([]);
    setInputValue("");
  };

  return {
    values,
    setValues,
    setInputValue,
    options,
    setOptions,
    resetValues,
    searching,
  };
}
