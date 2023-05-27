import React, { FC } from "react";
import styles from "./MonthDay.module.css";

import { Dayjs } from "dayjs";
import cn from "classnames";

import { isSameMonth, isToday } from "@/shared/lib";

import { useCalendarContext } from "../CalendarContext/CalendarContext";
import { DayEvent } from "../DayEvent/DayEvent";

interface MonthDayProps {
  day: Dayjs;
  rowIdx: number;
  className?: string;
}

export const MonthDay: FC<MonthDayProps> = ({ className, day, rowIdx }) => {
  const { onSelectDate, events, currentMonth } = useCalendarContext();

  function getCurrentDayClass() {
    return isToday(day) ? styles.current_day : "";
  }

  function getNotCurrentMonthClass() {
    return !isSameMonth(day, currentMonth) ? styles.not_current_month : "";
  }

  const handleDayClick = (day: Dayjs) => () => {
    onSelectDate?.(day.toDate());
  };

  return (
    <div className={cn(styles.wrapper, getNotCurrentMonthClass(), className)}>
      <header className={styles.header}>
        {rowIdx === 0 && (
          <p className={styles.day_text}>{day.format("ddd").toUpperCase()}</p>
        )}
        <p className={cn(styles.date_text, getCurrentDayClass())}>
          {day.format("DD")}
        </p>
      </header>
      <div className={styles.day} onClick={handleDayClick(day)}>
        {events?.map((evt, idx) => (
          <DayEvent event={evt} key={idx} currentDay={day} />
        ))}
      </div>
    </div>
  );
};
