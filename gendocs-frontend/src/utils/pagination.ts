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
    search,
    number,
    size,
}: IFilterPaginationProps): string {
    return parseObjectToQueryParams({
        "filter[search]": search,
        "page[number]": (number || 0) + 1,
        "page[size]": size,
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
