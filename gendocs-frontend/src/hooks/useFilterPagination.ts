import { debounce } from "lodash";
import {
  IFilterPaginationProps,
  IFilterProps,
  IPagination,
} from "models/interfaces/IPagination";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DEFAULT_PAGINATION_VALUES } from "utils/pagination";

type useFilterPaginationProps<T> = {
  fetch: (props: IFilterPaginationProps) => Promise<IPagination<T>>;
  filters?: IFilterProps;
  token?: number;
  key?: string;
};

export const useFilterPagination = <T>({
  fetch,
  filters,
  key = "search",
  token = 1,
}: useFilterPaginationProps<T>) => {
  const [data, setData] = useState<IPagination<T>>(DEFAULT_PAGINATION_VALUES);

  const [loading, setLoading] = useState<boolean>(false);
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

  const handleFetch = useCallback(
    async (
      props: IFilterPaginationProps,
      callback: (result: IPagination<T>) => void
    ) => {
      const result = await fetch(props);
      callback(result);
    },
    []
  );

  const debouncedFetch = useMemo(() => debounce(handleFetch, 300), []);

  useEffect(() => {
    if (token === -1) return;

    let active = true;

    setLoading(true);

    if (search) {
      debouncedFetch(
        {
          pagination: {
            number: data.meta.current_page,
            size: data.meta.per_page,
          },
          filters: {
            [key]: search,
            ...filters,
          },
        },
        (results) => {
          if (!active) {
            return;
          }
          setData(results);
          setLoading(false);
        }
      );
    } else {
      handleFetch(
        {
          pagination: {
            number: data.meta.current_page,
            size: data.meta.per_page,
          },
          filters: {
            search,
            [key]: search,
            ...filters,
          },
        },
        (results) => {
          if (!active) {
            return;
          }
          setData(results);
          setLoading(false);
        }
      );
    }

    return () => {
      active = false;
    };
  }, [data.meta.current_page, data.meta.per_page, search, token]);

  return {
    handlePageChange,
    handlePageSizeChange,
    loading,
    search,
    setSearch,
    data,
  };
};
