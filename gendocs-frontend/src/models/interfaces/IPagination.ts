export interface IPagination<T> {
    data: Array<T>;
    meta: Meta;
}

interface Meta {
    current_page: number;
    from?: any;
    last_page: number;
    next_page?: number | null;
    per_page: number;
    to?: any;
    total: number;
}

export interface IFilterPaginationProps {
    number?: number | null | undefined;
    search?: string | null | undefined;
    size?: number | null | undefined;
}
