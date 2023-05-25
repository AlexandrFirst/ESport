import { ReactNode } from "react";

export interface CalendarEvent {
  date: Date;
  title: ReactNode;
}

export interface IPublicCalendarContext {
  events?: CalendarEvent[];
  onSelectDate?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
  onNextMonthClick?: (newMonth: number) => void;
  onPrevMonthClick?: (newMonth: number) => void;
  onResetMonthClick?: (prevMonth: number) => void;
}
