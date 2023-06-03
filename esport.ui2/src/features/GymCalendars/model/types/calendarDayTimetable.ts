import { IDayTimetable } from "@/entities/gym";

export interface CalendarDayTimetable extends IDayTimetable {
  gymId: number;
  shiftId: number;
}
