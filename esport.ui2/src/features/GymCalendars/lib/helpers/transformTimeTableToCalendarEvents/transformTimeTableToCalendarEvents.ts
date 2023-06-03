import { CalendarEvent } from "@/shared/types";
import { IGymTimetable } from "@/entities/gym";

import { CalendarDayTimetable } from "../../../model/types/calendarDayTimetable";

export const transformTimeTableToCalendarEvents = (
  gymTimeTable?: IGymTimetable[]
): CalendarEvent[] => {
  return (
    gymTimeTable
      ?.map((timeTable) => {
        return timeTable.dayTimeTable.map((dayTimeTable) => {
          const event: CalendarEvent<CalendarDayTimetable> = {
            data: {
              ...dayTimeTable,
              gymId: timeTable.gymId,
              shiftId: dayTimeTable.shiftId,
            },
            dayOfTheWeek: timeTable.dayOfTheWeek,
            from: dayTimeTable.from,
            to: dayTimeTable.to,
          };
          return event;
        });
      })
      .flat(1) ?? []
  );
};
