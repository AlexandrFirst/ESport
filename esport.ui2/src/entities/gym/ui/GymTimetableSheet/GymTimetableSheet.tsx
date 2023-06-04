import React, { FC, ReactNode } from "react";
import styles from "./GymTimetableSheet.module.css";

import { TrashIcon } from "lucide-react";

import {
  Button,
  IconButton,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/shared/ui";

import {
  getTimeFromTimeSpan,
  useMappedDaysOfTheWeekByDayIndex,
} from "@/shared/lib";
import { CalendarEvent } from "@/shared/types";

import { IGymReadInfo } from "../../model/types/gym-read-info";
import { IGymWorkingHours } from "../../model/types/gym-working-hours";

import { CalendarDayTimetable } from "../../model/types/calendar/calendarDayTimetable";

export interface GymTimetableSheetProps {
  className?: string;
  open?: boolean;
  setOpen?: (p: boolean) => void;
  selectedDate?: Date;
  gym: Pick<IGymReadInfo, "name">;
  onSubmit?: () => Promise<void>;
  isLoading?: boolean;
  selectedEvent?: CalendarEvent<CalendarDayTimetable>;
  setSelectedEvent?: (
    event: CalendarEvent<CalendarDayTimetable> | undefined
  ) => void;
  workingHours?: Pick<IGymWorkingHours, "from" | "to">;
  onRemove?: (data?: CalendarEvent<CalendarDayTimetable>) => void;
  children?: ReactNode;
}

export const GymTimetableSheet: FC<GymTimetableSheetProps> = ({
  className,
  open,
  setOpen,
  selectedDate,
  gym,
  onSubmit,
  isLoading,
  selectedEvent,
  setSelectedEvent,
  workingHours,
  onRemove,
  children,
}) => {
  const mappedDays = useMappedDaysOfTheWeekByDayIndex();

  const handleClose = () => {
    setOpen?.(false);
    setSelectedEvent?.(undefined);
  };

  const handleRemove = () => {
    onRemove?.(selectedEvent);
    handleClose();
  };

  const handleSubmit = () => {
    onSubmit?.();
    handleClose();
  };

  return (
    <Sheet open={open}>
      <SheetContent onClickClose={handleClose}>
        <SheetHeader>
          <SheetTitle className={"flex items-center gap-5"}>
            Update timetable for {gym.name} (
            {getTimeFromTimeSpan(workingHours?.from)} -{" "}
            {getTimeFromTimeSpan(workingHours?.to)})
            {selectedEvent && (
              <IconButton
                Svg={TrashIcon}
                iconSize={"l"}
                svgClassName={styles.trash}
                onClick={handleRemove}
              />
            )}
          </SheetTitle>
          <SheetDescription>
            {selectedEvent ? "Edit" : "Add"} timetable for{" "}
            {mappedDays[selectedDate?.getDay() ?? 0]}{" "}
            {selectedEvent &&
              `(${getTimeFromTimeSpan(
                selectedEvent.from
              )} - ${getTimeFromTimeSpan(selectedEvent.to)})`}
          </SheetDescription>
        </SheetHeader>
        {children}
        <SheetFooter>
          <Button variant={"outlined"} onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} loading={isLoading}>
            Submit
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
