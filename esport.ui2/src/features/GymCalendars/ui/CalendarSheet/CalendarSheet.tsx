import React, { FC, useEffect } from "react";
import styles from "./CalendarSheet.module.css";

import { useForm } from "react-hook-form";
import cn from "classnames";

import {
  Button,
  Checkbox,
  FormWrapper,
  IconButton,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  TextArea,
  TimeInput,
} from "@/shared/ui";
import { CalendarEvent } from "@/shared/types";
import {
  getTimeFromTimeSpan,
  useMappedDaysOfTheWeekByDayIndex,
} from "@/shared/lib";

import { IGymReadInfo, IGymWorkingHours } from "@/entities/gym";

import {
  CreateUpdateShift,
  CreateUpdateShiftWithTrainerRequest,
} from "../../model/types/create-update-shift";
import { CalendarDayTimetable } from "../../model/types/calendarDayTimetable";
import { useValidation } from "../../lib/hooks/useValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { TrashIcon } from "lucide-react";

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
  onRemove?: (data?: CalendarEvent<CalendarDayTimetable>) => void;
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
  onRemove,
}) => {
  const validationSchema = useValidation();

  const mappedDays = useMappedDaysOfTheWeekByDayIndex();
  const handleClose = () => {
    setOpen?.(false);
    setSelectedEvent?.(undefined);
  };

  const methods = useForm<CreateUpdateShiftWithTrainerRequest>({
    defaultValues: {
      notifyOnUpdate: false,
      from: selectedEvent?.data?.from ?? workingHours?.from ?? "12:00",
      to: selectedEvent?.data?.to ?? workingHours?.to ?? "20:00",
    },
    resolver: yupResolver(validationSchema),
  });

  const handleSubmit = methods.handleSubmit(async (data) => {
    await onSubmit?.(data);
    handleClose();
  });

  const handleRemove = () => {
    onRemove?.(selectedEvent);
    handleClose();
  };

  useEffect(() => {
    methods.setValue(
      "from",
      selectedEvent?.data?.from ?? workingHours?.from ?? "12:00"
    );
    methods.setValue(
      "to",
      selectedEvent?.data?.to ?? workingHours?.to ?? "20:00"
    );
    methods.setValue("trainerRequest", "");
  }, [methods, selectedEvent, workingHours]);

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
            {mappedDays[currentDate?.getDay() ?? 0]}{" "}
            {selectedEvent &&
              `(${getTimeFromTimeSpan(
                selectedEvent.from
              )} - ${getTimeFromTimeSpan(selectedEvent.to)})`}
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
          {selectedEvent && (
            <TextArea
              className={"my-5"}
              name={"trainerRequest"}
              placeholder={"Create trainer request..."}
            />
          )}
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
