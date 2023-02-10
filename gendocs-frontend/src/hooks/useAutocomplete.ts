import { debounce } from "lodash";
import {
  IFilterPaginationProps,
  IFilterProps,
} from "models/interfaces/IPagination";
import { useEffect, useMemo, useState } from "react";

export type useAutocompleteProps<T> = {
  fetch: (props: IFilterPaginationProps) => Promise<any>;
  filters?: IFilterProps;
  preventSubmitOnOpen?: boolean;
  initValue?: T | null | undefined;
  enableReinitialize?: boolean;
};

export const useAutocomplete = <T>({
  fetch,
  filters,
  preventSubmitOnOpen = false,
  initValue,
  enableReinitialize,
}: useAutocompleteProps<T>) => {
  const [inputValue, setInputValue] = useState("");

  const [items, setItems] = useState<Array<T>>([]);
  const [value, setValue] = useState<T | null>(initValue || null);

  const [isOpen, setIsOpen] = useState(false);

  const [searching, setSearching] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleFetch = async (
    props: IFilterPaginationProps,
    callback: (results: any) => void
  ) => {
    const result = await fetch(props);
    callback(result);
  };

  const fetchDebounce = useMemo(() => debounce(handleFetch, 300), []);

  useEffect(() => {
    let active = true;

    if (!isOpen) {
      setItems([]);
      return;
    }

    // if (!inputValue) {
    //     // console.log({ inputValue });
    //     setItems(value ? [value] : []);
    //     return;
    // }

    // if (!inputValue && items.length) return;

    // if (value && items.includes(value)) return;

    // if (isOpen && value) return;

    if (isOpen && preventSubmitOnOpen && !inputValue) return;

    setSearching(true);

    fetchDebounce(
      {
        filters: {
          search: inputValue,
          estado: 1,
          ...filters,
        },
        pagination: {
          size: 10,
        },
      },
      (results: any) => {
        if (!active) return;

        let newOptions: Array<T> = [];

        // if (value) {
        //     newOptions = [value];
        // }

        if (results) {
          if (Array.isArray(results)) {
            newOptions = [...newOptions, ...results];
          } else {
            newOptions = [...newOptions, ...results.data];
          }
        }

        setItems(newOptions);
        setSearching(false);
      }
    );

    return () => {
      active = false;
    };
  }, [inputValue, isOpen]);

  useEffect(() => {
    if (enableReinitialize && initValue) {
      setValue(initValue);
    }
  }, [initValue]);

  const onChange = (event: React.SyntheticEvent, value: T | null) => {
    // setItems(value ? [value, ...items] : items);
    setValue(value);
  };

  const onInputChange = (
    event: React.SyntheticEvent,
    newInputValue: string
  ) => {
    setInputValue(newInputValue);
  };

  const resetValue = () => setValue(null);

  return {
    value,
    items,
    isOpen,
    onChange,
    searching,
    openModal,
    closeModal,
    resetValue,
    onInputChange,
    setValue,
  };
};
