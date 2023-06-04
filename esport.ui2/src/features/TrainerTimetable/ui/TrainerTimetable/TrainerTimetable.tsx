import { FC, useState } from "react";

import {
  TrainerCalendars,
  transfornGymTimetableByDateToCalendarEvent,
  useGetTrainerTimetable,
} from "@/entities/trainer";
import { TrainerTimetableSheet } from "../TrainerTimetableSheet/TrainerTimetableSheet";
import { CalendarEvent } from "@/shared/types";
import { IDayTimetable } from "@/entities/gym";

interface TrainerTimetableProps {
  className?: string;
  trainerId: number;
}

export const TrainerTimetable: FC<TrainerTimetableProps> = ({ trainerId }) => {
  const [sheetOpened, setSheetOpened] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<IDayTimetable>();

  const { data } = useGetTrainerTimetable({
    trainerId,
    startDateTime: new Date().toLocaleDateString(),
    dayRange: 30,
  });

  const handleEventClick = (event: CalendarEvent<IDayTimetable>, day: Date) => {
    setSheetOpened(true);
    setSelectedEvent(event.data);
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
      />
    </>
  );
};
