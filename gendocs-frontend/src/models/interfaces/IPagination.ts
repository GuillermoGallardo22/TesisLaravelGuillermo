import { GridRowModel } from "@mui/x-data-grid";

// export interface IPagination<T> {
//     current_page: number;
//     last_page: number;
//     data: GridRowModel<T>[];
//     total: number;
//     next_page_url?: string | null;
//     prev_page_url?: string | null;
// }

export interface IPagination<T> {
    data: Array<T>;
    links: Links;
    meta: Meta;
}

interface Meta {
    current_page: number;
    from?: any;
    last_page: number;
    links: Link[];
    path: string;
    per_page: number;
    to?: any;
    total: number;
}

interface Link {
    url?: string;
    label: string;
    active: boolean;
}

interface Links {
    first: string;
    last: string;
    prev?: any;
    next?: any;
}
