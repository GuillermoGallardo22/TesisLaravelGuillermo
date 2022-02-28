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

export interface IPaginationProps {
    number: number;
    size: number;
}

export interface IFilterProps {
    [filter: string]: string | number;
}

export interface IFilterPaginationProps {
    filters?: IFilterProps;
    pagination?: IPaginationProps;
}
