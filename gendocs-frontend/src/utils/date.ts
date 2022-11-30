import { format } from "date-fns";

export function parseToDate(date: string | Date) {
  if (typeof date === "string") {
    date = new Date(date);
  }

  return format(date, "dd/MM/yyyy");
}

export function parseToDateTime(date: string) {
  return format(new Date(date), "dd/MM/yyyy HH:mm a");
}
