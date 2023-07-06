import React, { FC, useState } from "react";

import { CalendarEvent } from "@/shared/types";

import {
  TrainerCalendars,
  transfornGymTimetableByDateToCalendarEvent,
  useGetTrainerTimetable,
} from "@/entities/trainer";
import { IDayTimetable } from "@/entities/gym";

import { TrainerTimetableSheet } from "../TrainerTimetableSheet/TrainerTimetableSheet";

interface TrainerTimetableProps {
  className?: string;
  trainerId: number;
  startDateTime?: string;
}

export const TrainerTimetable: FC<TrainerTimetableProps> = ({
  trainerId,
  startDateTime,
}) => {
  const [sheetOpened, setSheetOpened] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<IDayTimetable>();
  const [selectedDay, setSelectedDay] = useState<Date>();

  const { data } = useGetTrainerTimetable({
    trainerId,
    startDateTime: startDateTime ?? new Date().toDateString(),
    dayRange: 30,
  });

  const handleEventClick = (event: CalendarEvent<IDayTimetable>, day: Date) => {
    setSheetOpened(true);
    setSelectedEvent(event.data);
    setSelectedDay(day);
  };

  return (
    <>
      <TrainerCalendars
        timetable={transfornGymTimetableByDateToCalendarEvent(data ?? [])}
        onEventClick={handleEventClick}
      />
      <TrainerTimetableSheet
        open={sheetOpened}
        setOpen={setSheetOpened}
        selectedEvent={selectedEvent}
        selectedDay={selectedDay}
        setSelectedEvent={setSelectedEvent}
      />
    </>
  );
};
