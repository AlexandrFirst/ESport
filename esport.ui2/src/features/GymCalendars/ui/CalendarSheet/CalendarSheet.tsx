import React, { FC, useEffect } from "react";
import styles from "./CalendarSheet.module.css";
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
import { IGymReadInfo } from "@/entities/gym";
import { useMappedDaysOfTheWeekByDayIndex } from "@/shared/lib/hooks/localization/useMappedDaysOfTheWeekByDayIndex";
import { useForm } from "react-hook-form";
import { CreateUpdateShift } from "../../model/types/create-update-shift";
import cn from "classnames";
import { CalendarEvent } from "@/shared/types";
import { CalendarDayTimetable } from "../..";

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
          <SheetTitle>Update timetable for {gym.name}</SheetTitle>
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
