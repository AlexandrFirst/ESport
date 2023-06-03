import React, { FC, useEffect } from "react";
import styles from "./CalendarSheet.module.css";

import { useForm } from "react-hook-form";
import cn from "classnames";

import {
  Button,
  Checkbox,
  FormWrapper,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  TimeInput,
} from "@/shared/ui";
import { CalendarEvent } from "@/shared/types";
import {
  getTimeFromTimeSpan,
  useMappedDaysOfTheWeekByDayIndex,
} from "@/shared/lib";

import { IGymReadInfo, IGymWorkingHours } from "@/entities/gym";

import { CreateUpdateShift } from "../../model/types/create-update-shift";
import { CalendarDayTimetable } from "../../model/types/calendarDayTimetable";

interface CalendarSheetProps {
  className?: string;
  open?: boolean;
  setOpen?: (p: boolean) => void;
  currentDate?: Date | null;
  gym: Pick<IGymReadInfo, "name">;
  onSubmit?: (data: CreateUpdateShift) => Promise<void>;
  isLoading?: boolean;
  selectedEvent?: CalendarEvent<CalendarDayTimetable>;
  setSelectedEvent?: (
    event: CalendarEvent<CalendarDayTimetable> | undefined
  ) => void;
  workingHours?: Pick<IGymWorkingHours, "from" | "to">;
}

export const CalendarSheet: FC<CalendarSheetProps> = ({
  className,
  open,
  setOpen,
  currentDate,
  gym,
  onSubmit,
  isLoading,
  selectedEvent,
  setSelectedEvent,
  workingHours,
}) => {
  const mappedDays = useMappedDaysOfTheWeekByDayIndex();
  const handleClose = () => {
    setOpen?.(false);
    setSelectedEvent?.(undefined);
  };

  const methods = useForm<CreateUpdateShift>({
    defaultValues: {
      notifyOnUpdate: false,
      from: selectedEvent?.data?.from ?? "12:00",
      to: selectedEvent?.data?.to ?? "20:00",
    },
  });
  const handleSubmit = methods.handleSubmit(async (data) => {
    await onSubmit?.(data);
    handleClose();
  });

  useEffect(() => {
    methods.setValue("from", selectedEvent?.data?.from ?? "12:00");
    methods.setValue("to", selectedEvent?.data?.to ?? "20:00");
  }, [methods, selectedEvent]);

  return (
    <Sheet open={open}>
      <SheetContent onClickClose={handleClose}>
        <SheetHeader>
          <SheetTitle>
            Update timetable for {gym.name} (
            {getTimeFromTimeSpan(workingHours?.from)} -{" "}
            {getTimeFromTimeSpan(workingHours?.to)})
          </SheetTitle>
          <SheetDescription>
            {selectedEvent ? "Edit" : "Add"} timetable for{" "}
            {mappedDays[currentDate?.getDay() ?? 0]}
          </SheetDescription>
        </SheetHeader>
        <FormWrapper
          methods={methods}
          className={cn(styles.content, className)}
        >
          <div className={"flex gap-5 items-center justify-center"}>
            <TimeInput name={"from"} label={"From"} /> -
            <TimeInput name={"to"} label={"To"} />
          </div>
          <Checkbox name={"notifyOnUpdate"} label={"Notify me on update"} />
        </FormWrapper>
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
