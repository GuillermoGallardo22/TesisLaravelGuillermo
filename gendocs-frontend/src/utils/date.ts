import { format, parseISO } from "date-fns";

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

export function parseToDateString(date: string | Date | null) {

  if (date == null) return "";
  if (typeof date === "string") date = parseISO(date);

  return format(date, "dd/MM/yyyy");
}

export function parseToTimeString(date: string | Date | null) {
  return date == null ? "" : format(new Date(date), "HH:mm");
}

export function getFirstMonthDate(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1, 1);
}
