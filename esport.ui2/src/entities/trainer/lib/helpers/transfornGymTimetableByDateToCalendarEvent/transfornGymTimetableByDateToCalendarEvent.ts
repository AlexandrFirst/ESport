import { CalendarEvent } from "@/shared/types";
import { IDayTimetable, IGymTimetableByDate } from "@/entities/gym";

export const transfornGymTimetableByDateToCalendarEvent = (
  gymTimeTable: IGymTimetableByDate[]
): CalendarEvent<IDayTimetable>[] => {
  return gymTimeTable
    .map((gymTimeTableItem) => {
      return gymTimeTableItem.dayTimeTable.map((dayTimeTableItem) => ({
        from: dayTimeTableItem.from,
        to: dayTimeTableItem.to,
        dateTime: gymTimeTableItem.dateTime,
        data: dayTimeTableItem,
      }));
    })
    .flat(1);
};
