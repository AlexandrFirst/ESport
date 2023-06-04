import React, { FC, useState } from "react";

import { useRouter } from "next/router";
import { DayOfTheWeek } from "@/shared/constants";
import { CalendarEvent } from "@/shared/types";

import {
  CalendarDayTimetable,
  IGymReadInfo,
  useGetGymTimetable,
} from "@/entities/gym";

import { useAuth } from "@/entities/user";
import { useProfileInfo } from "@/entities/profile";
import { transformTimeTableToCalendarEvents } from "../../lib/helpers/transformTimeTableToCalendarEvents/transformTimeTableToCalendarEvents";

import { GymCalendars } from "../GymCalendars/GymCalendars";
import { CalendarSheet } from "../CalendarSheet/CalendarSheet";

interface EditableCalendarTimetableProps {
  className?: string;
  gym: IGymReadInfo;
}

export const EditableCalendarTimetable: FC<EditableCalendarTimetableProps> = ({
  className,
  gym,
}) => {
  const router = useRouter();
  const { gymId, organisationId } = router.query;

  const { data, isLoading: isTimetableLoading } = useGetGymTimetable(
    Number(gymId ?? 0),
    {
      dayOfTheWeeks: [DayOfTheWeek.ALL],
    }
  );

  const [isSheetOpened, setIsSheetOpened] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedEvent, setSelectedEvent] = useState<
    CalendarEvent<CalendarDayTimetable> | undefined
  >(undefined);

  const { user } = useAuth();
  const { isAdminForGyms, profileOrganisationId } = useProfileInfo({
    userId: user?.id ?? 0,
    gymIds: [Number(gymId ?? 0)],
  });

  const handleDayClick = (day: Date) => {
    setIsSheetOpened(true);
    setSelectedDate(day);
  };

  const handleSelectEvent = (
    event: CalendarEvent<CalendarDayTimetable>,
    day: Date
  ) => {
    setSelectedEvent(event);
    setSelectedDate(day);
    setIsSheetOpened(true);
  };

  const hasEditRights =
    isAdminForGyms || profileOrganisationId === Number(organisationId);

  return (
    <>
      <GymCalendars
        className={"mt-10"}
        calendarEvents={transformTimeTableToCalendarEvents(data?.gymTimeTable)}
        onDayClick={hasEditRights ? handleDayClick : undefined}
        onEventClick={hasEditRights ? handleSelectEvent : undefined}
      />
      {hasEditRights && (
        <CalendarSheet
          timetable={data?.gymTimeTable ?? []}
          selectedDate={selectedDate}
          gymId={Number(gymId)}
          gym={gym}
          open={isSheetOpened}
          setOpen={setIsSheetOpened}
          setSelectedEvent={setSelectedEvent}
          workingHours={{
            from: gym.onenTime,
            to: gym.closeTime,
          }}
          selectedEvent={selectedEvent}
        />
      )}
    </>
  );
};
