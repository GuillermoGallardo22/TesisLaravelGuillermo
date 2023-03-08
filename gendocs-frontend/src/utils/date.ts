import { format, parseISO } from "date-fns";

export enum DATE_FORMAT {
  LOCAL = "dd/MM/yyyy",
  GLOBAL = "yyyy-MM-dd",
}

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

export function parseToDateString(
  date: string | Date | null,
  formatter?: DATE_FORMAT
) {
  if (date == null) return "";
  if (typeof date === "string") date = parseISO(date);

  const _format = !formatter ? DATE_FORMAT.LOCAL : formatter;

  return format(date, _format);
}

export function parseToTimeString(date: string | Date | null) {
  return date == null ? "" : format(new Date(date), "HH:mm");
}

export function getFirstMonthDate(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1, 1);
}
