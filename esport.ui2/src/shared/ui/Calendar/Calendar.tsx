import { useState } from "react";

import dayjs from "dayjs";

import { ICalendarContext } from "@/shared/types";

import { MonthCalendar } from "./MonthCalendar/MonthCalendar";
import { CalendarContext } from "./CalendarContext/CalendarContext";
import { CalendarHeader } from "./CalendarHeader/CalendarHeader";

interface CalendarProps<T> extends ICalendarContext<T> {
  withHeader?: boolean;
  initialMonth?: number;
  onTodayClick?: () => void;
}

export function Calendar<T = any>({
  withHeader = true,
  initialMonth,
  currentMonth,
  setCurrentMonth,
  onTodayClick,
  ...context
}: CalendarProps<T>) {
  const [privateCurrentMonth, setPrivateCurrentMonth] = useState(
    initialMonth ?? dayjs().month()
  );

  return (
    <CalendarContext
      {...context}
      currentMonth={currentMonth ?? privateCurrentMonth}
      setCurrentMonth={setCurrentMonth ?? setPrivateCurrentMonth}
    >
      {withHeader && <CalendarHeader onTodayClick={onTodayClick} />}
      <MonthCalendar />
    </CalendarContext>
  );
}
