import { debounce } from "@mui/material";
import {
    IFilterPaginationProps,
    IFilterProps,
    IPagination,
} from "models/interfaces";
import { useEffect, useMemo, useState } from "react";

type useAutocompleteProps<T> = {
    fetch: (props: IFilterPaginationProps) => Promise<IPagination<T>>;
    filters?: IFilterProps;
    preventSubmitOnOpen?: boolean;
};

export const useAutocomplete = <T>({
    fetch,
    filters,
    preventSubmitOnOpen = false,
}: useAutocompleteProps<T>) => {
    const [inputValue, setInputValue] = useState("");

    const [items, setItems] = useState<Array<T>>([]);
    const [value, setValue] = useState<T | null>(null);

    const [isOpen, setIsOpen] = useState(false);

    const [searching, setSearching] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleFetch = async (
        props: IFilterPaginationProps,
        callback: (results: IPagination<T>) => void
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
            (results: IPagination<T>) => {
                if (!active) return;

                let newOptions: Array<T> = [];

                if (value) {
                    newOptions = [value];
                }

                if (results) {
                    newOptions = [...newOptions, ...results.data];
                }

                setItems(newOptions);
                setSearching(false);
            }
        );

        return () => {
            active = false;
        };
    }, [inputValue, isOpen]);

    const onChange = (event: React.SyntheticEvent, value: T | null) => {
        setItems(value ? [value, ...items] : items);
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
    };
};
