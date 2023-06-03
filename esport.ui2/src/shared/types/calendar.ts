import { ReactNode } from "react";
import { DayOfTheWeek } from "@/shared/constants";

interface CommonCalendarEvent<T = any> {
  title?: ReactNode;
  from?: string;
  to?: string;
  data?: T;
}

export interface CalendarEventByDate<T = any> extends CommonCalendarEvent<T> {
  dateTime: Date;
}

export interface CalendarEventByDay<T = any> extends CommonCalendarEvent<T> {
  dayOfTheWeek: DayOfTheWeek;
}

export type CalendarEvent<T = any> =
  | CalendarEventByDate<T>
  | CalendarEventByDay<T>;

export interface IPublicCalendarContext<T = any> {
  events?: CalendarEvent<T>[];
  onSelectDate?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent<T>, day: Date) => void;
  onNextMonthClick?: (newMonth: number) => void;
  onPrevMonthClick?: (newMonth: number) => void;
  onResetMonthClick?: (prevMonth: number) => void;
  currentMonth?: number;
  setCurrentMonth?: (newMonth: number) => void;
}
