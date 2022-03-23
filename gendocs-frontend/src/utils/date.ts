import { format } from "date-fns";

export function parseToDateTime(date: string) {
    return format(new Date(date), "dd/MM/yyyy HH:mm a");
}
