export function addMonths(date: string | Date, months: number) {
  if (typeof date === "string") {
    date = new Date(date);
  }
  date.setMonth(date.getMonth() + months);

  return date;
}
