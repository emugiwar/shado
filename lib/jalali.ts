import dayjs from "dayjs";
import jalaliday from "jalaliday";
import "dayjs/locale/fa";

dayjs.extend(jalaliday);

dayjs.locale("fa");

export const weekdaysFa = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"];

export function toJalali(input: string | Date) {
  return dayjs(input).calendar("jalali");
}

export function formatJalaliDate(input: string | Date, format = "dddd D MMMM YYYY") {
  return toJalali(input).locale("fa").format(format);
}

export function formatJalaliMonth(input: string | Date) {
  return formatJalaliDate(input, "MMMM YYYY");
}

export function startOfJalaliMonth(input: string | Date) {
  return toJalali(input).startOf("month");
}

export function jalaliMonthDays(input: string | Date) {
  const start = startOfJalaliMonth(input);
  const end = start.endOf("month");
  const days: dayjs.Dayjs[] = [];
  let current = start;
  while (current.isBefore(end) || current.isSame(end, "day")) {
    days.push(current);
    current = current.add(1, "day");
  }
  return days;
}

export function parseLocalDayToRange(dayISO: string) {
  const start = dayjs(dayISO).startOf("day");
  const end = start.endOf("day");
  return { start, end };
}

export { dayjs };
