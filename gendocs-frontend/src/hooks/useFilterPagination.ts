import { IFilterPaginationProps, IPagination } from "models/interfaces";
import { useEffect, useState } from "react";
import { DEFAULT_PAGINATION_VALUES } from "utils/pagination";

export const useFilterPagination = <T>({
    filter,
}: {
    filter: (props: IFilterPaginationProps) => Promise<IPagination<T>>;
}) => {
    const [data, setData] = useState<IPagination<T>>(DEFAULT_PAGINATION_VALUES);

    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState("");

    const handlePageChange = (newPage: number) => {
        setData((prev) => ({
            ...prev,
            meta: { ...prev.meta, current_page: newPage },
        }));
    };

    const handlePageSizeChange = (newSize: number) => {
        setData((prev) => ({
            data: [],
            meta: {
                ...prev.meta,
                current_page: 0,
                per_page: newSize,
            },
        }));
    };

    useEffect(() => {
        if (search) {
            const delayDebounceFn = setTimeout(() => {
                (async () => {
                    setLoading(true);

                    const response = await filter({
                        number: data.meta.current_page,
                        size: data.meta.per_page,
                        search,
                    });

                    setData(response);
                    setLoading(false);
                })();
            }, 600);

            return () => clearTimeout(delayDebounceFn);
        } else {
            let active = true;

            (async () => {
                setLoading(true);

                const response = await filter({
                    number: data.meta.current_page,
                    size: data.meta.per_page,
                    search,
                });

                if (!active) {
                    return;
                }

                setData(response);
                setLoading(false);
            })();

            return () => {
                active = false;
            };
        }
    }, [data.meta.current_page, data.meta.per_page, search]);

    return {
        handlePageChange,
        handlePageSizeChange,
        loading,
        search,
        setSearch,
        data,
    };
};
