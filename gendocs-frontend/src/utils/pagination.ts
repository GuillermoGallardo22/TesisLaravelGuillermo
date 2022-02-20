import { IFilterPaginationProps, IPagination } from "models/interfaces";
import { parseObjectToQueryParams } from "./libs";

export const PAGE_SIZE = 50;

export const DEFAULT_PAGINATION_VALUES = {
    data: [],
    meta: {
        current_page: 0,
        last_page: 0,
        total: 0,
        per_page: PAGE_SIZE,
    },
};

export function parseFilterPaginationProps({
    filters: filterProps,
    pagination: paginationProps,
}: IFilterPaginationProps): string {
    let pagination = {};

    if (paginationProps) {
        pagination = {
            "page[number]": paginationProps.number + 1,
            "page[size]": paginationProps.size,
        };
    }

    let filter = {};
    if (filterProps) {
        filter = Object.keys(filterProps).reduce(
            (p, c) => ({ ...p, [`filter[${c}]`]: filterProps[c] }),
            {}
        );
    }

    return parseObjectToQueryParams({
        ...pagination,
        ...filter,
        //
    });
}

export function parsePaginationData<T>(data: any): IPagination<T> {
    return {
        ...data,
        meta: {
            ...data.meta,
            current_page: data.meta.current_page - 1,
        },
    };
}
