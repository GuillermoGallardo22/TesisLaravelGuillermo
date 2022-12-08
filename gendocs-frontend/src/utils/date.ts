import { format } from "date-fns";

export function parseToDate(date: string | Date | null) {
  if (typeof date === "string") {
    date = new Date(date);
  } else if (date === null) {
    return "";
  }

  return format(date, "dd/MM/yyyy");
}

export function parseToDateTime(date: string) {
  return format(new Date(date), "dd/MM/yyyy HH:mm a");
}
