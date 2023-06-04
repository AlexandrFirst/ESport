import React, { useState } from "react";
import styles from "./TwoCalendars.module.css";
import { getCurrentMonth } from "@/shared/lib";
import { StickyContentLayout } from "@/shared/layouts";
import { Calendar, SmallCalendar } from "../..";
import { CalendarEvent } from "@/shared/types";

export interface TwoCalendarsProps<T> {
  className?: string;
  initialMonth?: number;
  calendarEvents?: CalendarEvent<T>[];
  onDayClick?: (day: Date) => void;
  onEventClick?: (event: CalendarEvent<T>, day: Date) => void;
}

export function TwoCalendars<T>({
  initialMonth,
  className,
  calendarEvents,
  onDayClick,
  onEventClick,
}: TwoCalendarsProps<T>) {
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(
    initialMonth ?? getCurrentMonth()
  );
  const [bigCalendarMonth, setBigCalendarMonth] = useState(
    initialMonth ?? getCurrentMonth()
  );

  const handleBigCalendarNextMonthClick = (newMonth: number) => {
    if (newMonth > smallCalendarMonth) {
      setSmallCalendarMonth(newMonth);
    }
  };

  const handleBigCalendarPrevMonthClick = (newMonth: number) => {
    if (newMonth < smallCalendarMonth) {
      setSmallCalendarMonth(newMonth);
    }
  };

  const handleSmallCalendarDaySelect = (day: Date) => {
    setBigCalendarMonth(day.getMonth());
    onDayClick?.(day);
  };

  const handleTodayClick = () => {
    setSmallCalendarMonth(getCurrentMonth());
    setBigCalendarMonth(getCurrentMonth());
  };

  return (
    <StickyContentLayout
      left={
        <SmallCalendar
          className={styles.small_calendar}
          currentMonth={smallCalendarMonth}
          setCurrentMonth={setSmallCalendarMonth}
          onDayClick={handleSmallCalendarDaySelect}
        />
      }
      className={className}
    >
      <Calendar
        onNextMonthClick={handleBigCalendarNextMonthClick}
        onPrevMonthClick={handleBigCalendarPrevMonthClick}
        currentMonth={bigCalendarMonth}
        setCurrentMonth={setBigCalendarMonth}
        onTodayClick={handleTodayClick}
        events={calendarEvents}
        onSelectDate={onDayClick}
        onEventClick={onEventClick}
      />
    </StickyContentLayout>
  );
}
