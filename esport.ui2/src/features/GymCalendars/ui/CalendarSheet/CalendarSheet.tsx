import React, { FC, useEffect } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";

import { DayOfTheWeek } from "@/shared/constants";
import { CalendarEvent } from "@/shared/types";
import { useSnackbar } from "@/shared/lib";

import {
  CalendarDayTimetable,
  CreateUpdateShiftWithTrainerRequest,
  CreateUpdateTimetableForm,
  gymApiKeys,
  GymTimetableSheet,
  GymTimetableSheetProps,
  IGymTimetable,
  useAddUpdateTimetable,
  useCreateTrainerRequest,
} from "@/entities/gym";

import { useValidation } from "../../lib/hooks/useValidation";
import { transformCreateUpdateShiftToAddUpdateGymTimetable } from "../../lib/helpers/transformCreateUpdateShiftToAddUpdateGymTimetable/transformCreateUpdateShiftToAddUpdateGymTimetable";

interface CalendarSheetProps
  extends Pick<
    GymTimetableSheetProps,
    | "gym"
    | "selectedEvent"
    | "setSelectedEvent"
    | "workingHours"
    | "open"
    | "setOpen"
    | "selectedDate"
  > {
  timetable: IGymTimetable[];
  gymId: number;
}

export const CalendarSheet: FC<CalendarSheetProps> = ({
  setSelectedEvent,
  gym,
  selectedEvent,
  workingHours,
  timetable,
  selectedDate,
  gymId,
  setOpen,
  open,
}) => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useSnackbar();

  const { mutate: mutateAddUpdateTimetable, isLoading: isUpdateLoading } =
    useAddUpdateTimetable();
  const {
    mutate: mutateCreateTrainerRequest,
    isLoading: isCreateRequestLoading,
  } = useCreateTrainerRequest();

  const onSuccess = async () => {
    await queryClient.invalidateQueries({
      queryKey: gymApiKeys.gymTimetable(Number(gymId), {
        dayOfTheWeeks: [DayOfTheWeek.ALL],
      }),
    });
    showSuccess("Timetable has been added successfully");
  };

  const onError = (e: any) => {
    showError(e?.[0] ?? e?.message ?? "Something went wrong");
  };

  const validationSchema = useValidation();

  const methods = useForm<CreateUpdateShiftWithTrainerRequest>({
    defaultValues: {
      notifyOnUpdate: false,
      from: selectedEvent?.data?.from ?? workingHours?.from ?? "12:00",
      to: selectedEvent?.data?.to ?? workingHours?.to ?? "20:00",
    },
    resolver: yupResolver(validationSchema),
  });

  const handleSubmit = methods.handleSubmit(async (data) => {
    console.log("===data===", data);
    await mutateAddUpdateTimetable(
      transformCreateUpdateShiftToAddUpdateGymTimetable({
        gymId: Number(gymId),
        gymTimetable: timetable ?? [],
        selectedDate,
        selectedEvent,
        data,
      }),
      { onSuccess, onError }
    );
    if (data.trainerRequest) {
      await mutateCreateTrainerRequest(
        {
          gymId: Number(gymId),
          shiftId: selectedEvent?.data?.shiftId ?? 0,
          description: data.trainerRequest,
        },
        {
          onError,
        }
      );
    }
  });

  const handleDelete = async (event?: CalendarEvent<CalendarDayTimetable>) => {
    await mutateAddUpdateTimetable(
      transformCreateUpdateShiftToAddUpdateGymTimetable({
        gymId: Number(gymId),
        gymTimetable: timetable ?? [],
        selectedDate,
        selectedEvent,
        shiftToDelete: event?.data,
      }),
      { onSuccess, onError }
    );
  };

  useEffect(() => {
    if (open) {
      methods.setValue(
        "from",
        selectedEvent?.data?.from ?? workingHours?.from ?? "12:00"
      );
      methods.setValue(
        "to",
        selectedEvent?.data?.to ?? workingHours?.to ?? "20:00"
      );
      methods.setValue("trainerRequest", "");
    }
  }, [methods, open, selectedEvent, workingHours]);

  return (
    <GymTimetableSheet
      gym={gym}
      onRemove={handleDelete}
      onSubmit={handleSubmit}
      selectedEvent={selectedEvent}
      workingHours={workingHours}
      open={open}
      setOpen={setOpen}
      isLoading={isUpdateLoading || isCreateRequestLoading}
      setSelectedEvent={setSelectedEvent}
      selectedDate={selectedDate}
    >
      <CreateUpdateTimetableForm
        methods={methods}
        withTrainerRequest={!!selectedEvent}
      />
    </GymTimetableSheet>
  );
};
