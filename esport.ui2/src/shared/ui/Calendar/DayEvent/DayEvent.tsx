import React, { FC } from "react";
import styles from "./DayEvent.module.css";
import { useCalendarContext } from "../CalendarContext/CalendarContext";
import { CalendarEvent } from "@/shared/types";
import { getTime, isSameDay } from "@/shared/lib";
import { Dayjs } from "dayjs";

interface DayEventProps {
  event: CalendarEvent;
  currentDay: Dayjs;
}

export const DayEvent: FC<DayEventProps> = ({ event, currentDay }) => {
  const { onEventClick } = useCalendarContext();

  const handleEventClick = () => {
    onEventClick?.(event);
  };

  return isSameDay(event.date, currentDay) ? (
    <div onClick={handleEventClick} className={styles.event}>
      <span className={styles.event_title}>{event.title}</span>
      <span>{getTime(event.date)}</span>
    </div>
  ) : null;
};
