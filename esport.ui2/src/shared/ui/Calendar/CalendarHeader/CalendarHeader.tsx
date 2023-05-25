import React, { FC } from "react";
import styles from "./CalendarHeader.module.css";

import dayjs from "dayjs";
import cn from "classnames";

import ChevronLeftIcon from "@heroicons/react/24/solid/ChevronLeftIcon";
import ChevronRightIcon from "@heroicons/react/24/solid/ChevronRightIcon";

import { IconButton } from "../../IconButton/IconButton";
import { Button } from "../../Button/Button";

import { useCalendarContext } from "../CalendarContext/CalendarContext";

interface CalendarHeaderProps {
  className?: string;
}

export const CalendarHeader: FC<CalendarHeaderProps> = ({ className }) => {
  const {
    currentMonth,
    setCurrentMonth,
    onNextMonthClick,
    onPrevMonthClick,
    onResetMonthClick,
  } = useCalendarContext();

  function handlePrevMonth() {
    const newMonth = currentMonth - 1;
    onPrevMonthClick?.(newMonth);
    setCurrentMonth(newMonth);
  }

  function handleNextMonth() {
    const newMonth = currentMonth + 1;
    onNextMonthClick?.(newMonth);
    setCurrentMonth(newMonth);
  }

  function handleReset() {
    onResetMonthClick?.(currentMonth);
    setCurrentMonth(dayjs().month());
    // setCurrentMonth(
    //   currentMonth === dayjs().month()
    //     ? currentMonth + Math.random()
    //     : dayjs().month()
    // );
  }

  return (
    <header className={cn(styles.header, className)}>
      <div className={"flex gap-5 items-center"}>
        <ul className={"flex"}>
          <li>
            <IconButton
              Svg={ChevronLeftIcon}
              iconSize={"s"}
              onClick={handlePrevMonth}
            />
          </li>

          <li>
            <IconButton
              Svg={ChevronRightIcon}
              iconSize={"s"}
              onClick={handleNextMonth}
            />
          </li>
        </ul>

        <h2 className={styles.date}>
          {/*TODO: for now we assume that user will not move us to next/prev year*/}
          {dayjs(new Date(dayjs().year(), currentMonth)).format("MMMM YYYY")}
        </h2>
      </div>
      <Button
        variant={"outlined"}
        fullWidth={false}
        color={"theme-main"}
        onClick={handleReset}
      >
        Today
      </Button>
    </header>
  );
};
