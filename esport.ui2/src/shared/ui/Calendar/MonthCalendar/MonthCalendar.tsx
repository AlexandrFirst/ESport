import React, { FC } from "react";

import { getCalendarMonthMatrix } from "@/shared/lib";

import { Month } from "../Month/Month";
import { useCalendarContext } from "../CalendarContext/CalendarContext";

interface MonthCalendarProps {
  className?: string;
}

export const MonthCalendar: FC<MonthCalendarProps> = ({ className }) => {
  const { currentMonth } = useCalendarContext();

  return <Month month={getCalendarMonthMatrix(currentMonth)} />;
};
