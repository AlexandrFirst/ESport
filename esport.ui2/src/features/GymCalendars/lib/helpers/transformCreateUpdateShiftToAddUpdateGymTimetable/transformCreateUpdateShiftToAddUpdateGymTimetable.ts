import { getDayOfTheWeekByDayIndex } from "@/shared/lib";
import { CalendarEvent } from "@/shared/types";

import {
  AddUpdateGymTimetableRequest,
  CalendarDayTimetable,
  CreateUpdateShift,
  IGymTimetable,
} from "@/entities/gym";

interface Params {
  gymId: number;
  gymTimetable: IGymTimetable[];
  selectedDate?: Date;
  selectedEvent?: CalendarEvent<CalendarDayTimetable>;
  data?: CreateUpdateShift;
  shiftToDelete?: CalendarDayTimetable;
}

export const transformCreateUpdateShiftToAddUpdateGymTimetable = ({
  gymId,
  gymTimetable,
  selectedDate,
  selectedEvent,
  data,
  shiftToDelete,
}: Params): AddUpdateGymTimetableRequest => {
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

  if (data) {
    gymShiftInfos.push({
      dayOfTheWeek: getDayOfTheWeekByDayIndex(selectedDate),
      end: data.to,
      start: data.from,
      notifyOnUpdate: data.notifyOnUpdate,
      gymShiftId: selectedEvent?.data?.shiftId ?? 0,
      forceUpdateOverridenTimes: false,
    });
  }

  if (shiftToDelete) {
    gymShiftInfos = gymShiftInfos.filter(
      (shift) => shift.gymShiftId !== shiftToDelete.shiftId
    );
  }

  return {
    gymId,
    gymShiftInfos,
  };
};
