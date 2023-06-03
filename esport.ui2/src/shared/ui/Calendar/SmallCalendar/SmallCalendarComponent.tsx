import React, { FC, Fragment, useEffect, useState } from "react";
import styles from "./SmallCalendar.module.css";

import dayjs, { Dayjs } from "dayjs";
import cn from "classnames";

import ChevronLeftIcon from "@heroicons/react/24/solid/ChevronLeftIcon";
import ChevronRightIcon from "@heroicons/react/24/solid/ChevronRightIcon";

import {
  getCalendarMonthMatrix,
  isSameDay,
  isSameMonth,
  isToday,
} from "@/shared/lib";
import { IconButton } from "../..";
import { useSmallCalendarContext } from "./SmallCalendarContext";

interface SmallCalendarProps {
  onPrevClick?: (newMonth: number) => void;
  onNextClick?: (newMonth: number) => void;
  onDayClick?: (day: Date) => void;
  className?: string;
}

export const SmallCalendarComponent: FC<SmallCalendarProps> = ({
  className,
  onNextClick,
  onPrevClick,
  onDayClick,
}) => {
  const { setCurrentMonth, currentMonth } = useSmallCalendarContext();
  const [currentMonthMatrix, setCurrentMonthMatrix] = useState(
    getCalendarMonthMatrix()
  );
  const [selectedDay, setSelectedDay] = useState<Dayjs | null>(null);

  useEffect(() => {
    setCurrentMonthMatrix(getCalendarMonthMatrix(currentMonth));
  }, [currentMonth]);

  const getDayClass = (day: Dayjs) => {
    if (isToday(day)) {
      return styles.current_day;
    } else if (isSameDay(day, selectedDay)) {
      return styles.selected_day;
    }
    return "";
  };

  const getDayTextClass = (day: Dayjs) => {
    if (isToday(day) || isSameDay(day, selectedDay)) {
      return styles.current_day_text;
    } else if (!isSameMonth(day, currentMonth)) {
      return styles.not_current_month_text;
    }
    return "";
  };

  function handlePrevMonth() {
    onPrevClick?.(currentMonth - 1);
    setCurrentMonth(currentMonth - 1);
  }
  function handleNextMonth() {
    onNextClick?.(currentMonth + 1);
    setCurrentMonth(currentMonth + 1);
  }

  const handleClickDay = (day: Dayjs) => () => {
    onDayClick?.(day.toDate());
    setSelectedDay(day);
  };

  return (
    <div className={cn(styles.wrapper, className)}>
      <header className={styles.header}>
        <p className={styles.date}>
          {dayjs(new Date(dayjs().year(), currentMonth)).format("MMMM YYYY")}
        </p>
        <div className={styles.btn_wrapper}>
          <button onClick={handlePrevMonth}>
            <IconButton
              Svg={ChevronLeftIcon}
              iconSize={"s"}
              className={styles.icon}
            />
          </button>
          <button onClick={handleNextMonth}>
            <IconButton Svg={ChevronRightIcon} iconSize={"s"} />
          </button>
        </div>
      </header>
      <div className={styles.day_grid}>
        {currentMonthMatrix[0].map((day, i) => (
          <span key={i} className={styles.week_day}>
            {day.format("dd").charAt(0)}
          </span>
        ))}
        {currentMonthMatrix.map((row, i) => (
          <Fragment key={i}>
            {row.map((day, idx) => (
              <button
                key={idx}
                onClick={handleClickDay(day)}
                className={cn(styles.day_wrapper, getDayClass(day))}
              >
                <span className={cn(styles.day_text, getDayTextClass(day))}>
                  {day.format("D")}
                </span>
              </button>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
