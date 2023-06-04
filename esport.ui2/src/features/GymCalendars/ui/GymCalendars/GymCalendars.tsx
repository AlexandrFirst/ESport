import { FC } from "react";
import { TwoCalendars, TwoCalendarsProps } from "@/shared/ui";

import { CalendarDayTimetable } from "@/entities/gym";

interface GymCalendarsProps extends TwoCalendarsProps<CalendarDayTimetable> {}

export const GymCalendars: FC<GymCalendarsProps> = (props) => {
  return <TwoCalendars {...props} />;
};
