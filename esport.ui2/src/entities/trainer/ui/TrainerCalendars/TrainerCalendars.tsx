import { FC } from "react";

import { TwoCalendars, TwoCalendarsProps } from "@/shared/ui";
import { CalendarEvent } from "@/shared/types";

import { IDayTimetable } from "@/entities/gym";

interface TrainerCalendarsProps
  extends Omit<TwoCalendarsProps<IDayTimetable>, "calendarEvents"> {
  className?: string;
  timetable: CalendarEvent<IDayTimetable>[];
}

export const TrainerCalendars: FC<TrainerCalendarsProps> = ({
  timetable,
  ...props
}) => {
  return <TwoCalendars {...props} calendarEvents={timetable} />;
};
