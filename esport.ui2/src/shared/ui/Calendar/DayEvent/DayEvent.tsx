import React, { FC } from "react";
import styles from "./DayEvent.module.css";
import { useCalendarContext } from "../CalendarContext/CalendarContext";
import { CalendarEvent } from "@/shared/types";
import {
  getTimeFromTimeSpan,
  isSameDay,
  isSameDayOfTheWeek,
} from "@/shared/lib";
import { Dayjs } from "dayjs";
import { CalendarEventByDay } from "@/shared/types/calendar";
import cn from "classnames";

interface DayEventProps {
  event: CalendarEvent;
  currentDay: Dayjs;
}

export const DayEvent: FC<DayEventProps> = ({ event, currentDay }) => {
  const { onEventClick } = useCalendarContext();

  const handleEventClick = () => {
    onEventClick?.(event, currentDay.toDate());
  };

  const isDayOfTheWeekEvent = (
    event: CalendarEvent
  ): event is CalendarEventByDay => {
    return "dayOfTheWeek" in event;
  };

  const renderEvent = () => (
    <div
      onClick={handleEventClick}
      className={cn(styles.event, {
        [styles.clickable]: Boolean(onEventClick),
      })}
    >
      <div className={styles.event_title}>{event.title}</div>
      <span>
        {getTimeFromTimeSpan(event.from)} - {getTimeFromTimeSpan(event.to)}
      </span>
    </div>
  );

  return !isDayOfTheWeekEvent(event)
    ? isSameDay(event.dateTime, currentDay)
      ? renderEvent()
      : null
    : isSameDayOfTheWeek(event.dayOfTheWeek, currentDay)
    ? renderEvent()
    : null;

  // return isSameDay(event.date, currentDay) ? (
  //   <div onClick={handleEventClick} className={styles.event}>
  //     <div className={styles.event_title}>{event.title}</div>
  //     <span>{getTime(event.date)}</span>
  //   </div>
  // ) : null;
};
