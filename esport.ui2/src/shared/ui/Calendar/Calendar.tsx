import { FC, useState } from "react";

import dayjs from "dayjs";

import { ICalendarContext } from "@/shared/types";

import { MonthCalendar } from "./MonthCalendar/MonthCalendar";
import { CalendarContext } from "./CalendarContext/CalendarContext";
import { CalendarHeader } from "./CalendarHeader/CalendarHeader";

interface CalendarProps extends ICalendarContext {
  withHeader?: boolean;
  initialMonth?: number;
}

export const Calendar: FC<CalendarProps> = ({
  withHeader = true,
  initialMonth,
  ...context
}) => {
  const [currentMonth, setCurrentMonth] = useState(
    initialMonth ?? dayjs().month()
  );

  return (
    <CalendarContext
      {...context}
      currentMonth={currentMonth}
      setCurrentMonth={setCurrentMonth}
    >
      {withHeader && <CalendarHeader />}
      <MonthCalendar />
    </CalendarContext>
  );
};
