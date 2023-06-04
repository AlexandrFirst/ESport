import { FC } from "react";

import { TwoCalendars } from "@/shared/ui";
import { CalendarEvent } from "@/shared/types";

interface TrainerCalendarsProps {
  className?: string;
  timetable: CalendarEvent<unknown>[];
}

export const TrainerCalendars: FC<TrainerCalendarsProps> = ({ timetable }) => {
  return <TwoCalendars calendarEvents={timetable} />;
};
