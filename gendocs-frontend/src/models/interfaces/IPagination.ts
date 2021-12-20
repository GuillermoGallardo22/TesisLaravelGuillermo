import { GridRowModel } from "@mui/x-data-grid";

export interface IPagination<T> {
    current_page: number;
    last_page: number;
    data: GridRowModel<T>[];
    total: number;
    next_page_url?: string | null;
    prev_page_url?: string | null;
}
