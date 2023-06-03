import { FC, useState } from "react";
import styles from "./GymCalendars.module.css";

import { StickyContentLayout } from "@/shared/layouts";
import { Calendar, SmallCalendar } from "@/shared/ui";
import { getCurrentMonth } from "@/shared/lib";
import { CalendarEvent } from "@/shared/types";

import { CalendarDayTimetable } from "../../model/types/calendarDayTimetable";

interface GymCalendarsProps {
  className?: string;
  initialMonth?: number;
  calendarEvents?: CalendarEvent<CalendarDayTimetable>[];
  onDayClick?: (day: Date) => void;
  onEventClick?: (
    event: CalendarEvent<CalendarDayTimetable>,
    day: Date
  ) => void;
}

export const GymCalendars: FC<GymCalendarsProps> = ({
  initialMonth,
  className,
  calendarEvents,
  onDayClick,
  onEventClick,
}) => {
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
};
