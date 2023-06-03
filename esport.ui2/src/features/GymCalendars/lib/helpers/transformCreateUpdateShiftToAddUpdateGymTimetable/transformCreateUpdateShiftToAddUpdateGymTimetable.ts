import {CreateUpdateShift} from "../../..";
import {AddUpdateGymTimetableRequest, IGymTimetable} from "@/entities/gym";
import {getDayOfTheWeekByDayIndex} from "@/shared/lib";

//TODO: implement
export const transformCreateUpdateShiftToAddUpdateGymTimetable = (
  gymId: number,
  gymTimetable: IGymTimetable[],
  data: CreateUpdateShift,
  selectedDate?: Date
): AddUpdateGymTimetableRequest => {
  const gymShiftInfos = gymTimetable
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

  gymShiftInfos.push({
    dayOfTheWeek: getDayOfTheWeekByDayIndex(selectedDate),
    end: data.to,
    start: data.from,
    notifyOnUpdate: data.notifyOnUpdate,
    gymShiftId: 0,
    forceUpdateOverridenTimes: false,
  });
  return {
    gymId,
    gymShiftInfos,
  };
};
