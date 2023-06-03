import { CalendarDayTimetable, CreateUpdateShift } from "../../..";
import { AddUpdateGymTimetableRequest, IGymTimetable } from "@/entities/gym";
import { getDayOfTheWeekByDayIndex } from "@/shared/lib";
import { CalendarEvent } from "@/shared/types";

//TODO: implement
export const transformCreateUpdateShiftToAddUpdateGymTimetable = (
  gymId: number,
  gymTimetable: IGymTimetable[],
  data: CreateUpdateShift,
  selectedDate?: Date,
  selectedEvent?: CalendarEvent<CalendarDayTimetable>
): AddUpdateGymTimetableRequest => {
  let gymShiftInfos = gymTimetable
    .map((timetable) => {
      return timetable.dayTimeTable.map((dayTimeTable) => {
        return {
          gymShiftId: dayTimeTable.shiftId,
          start: dayTimeTable.from,
          end: dayTimeTable.to,
          dayOfTheWeek: timetable.dayOfTheWeek,
          //TODO: confirm with backend
          notifyOnUpdate: false,
          forceUpdateOverridenTimes: false,
        };
      });
    })
    .flat(1);

  if (selectedEvent && selectedEvent.data) {
    gymShiftInfos = gymShiftInfos.filter(
      (shift) => shift.gymShiftId !== selectedEvent?.data?.shiftId
    );
  }

  gymShiftInfos.push({
    dayOfTheWeek: getDayOfTheWeekByDayIndex(selectedDate),
    end: data.to,
    start: data.from,
    notifyOnUpdate: data.notifyOnUpdate,
    gymShiftId: selectedEvent?.data?.shiftId ?? 0,
    forceUpdateOverridenTimes: false,
  });
  return {
    gymId,
    gymShiftInfos,
  };
};
