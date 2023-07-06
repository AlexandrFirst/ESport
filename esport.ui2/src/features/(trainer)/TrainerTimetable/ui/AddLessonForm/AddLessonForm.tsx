import React, { FC } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";

import { Button, FormWrapper } from "@/shared/ui";
import { useSnackbar } from "@/shared/lib";
import { DayOfTheWeek } from "@/shared/constants";

import {
  FromToTime,
  LessonType,
  LessonTypeDropdown,
  useTranslatedLessonType,
} from "@/entities/lesson";
import { trainerApiKeys, useCreateLesson } from "@/entities/trainer";

import { useValidation } from "../../lib/hooks/useValidation";
import { IAddLessonForm } from "../../model/types/AddLessonForm";
import { transformLessonToCreate } from "../../lib/helpers/transformLessonToCreate/transformLessonToCreate";

interface AddLessonFormProps {
  className?: string;
  onSuccess?: (data: IAddLessonForm) => void;
  onCancel?: () => void;
  dayOfTheWeek?: DayOfTheWeek;
  trainerScheduleId?: number;
}

export const AddLessonForm: FC<AddLessonFormProps> = ({
  className,
  onSuccess,
  onCancel,
  dayOfTheWeek = DayOfTheWeek.MONDAY,
  trainerScheduleId,
}) => {
  const schema = useValidation();
  const translatedLessonType = useTranslatedLessonType();
  const { showApiError, showSuccess } = useSnackbar();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useCreateLesson();

  const methods = useForm<IAddLessonForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      from: "11:00",
      to: "12:00",
      lessonType: { title: "Individual", value: LessonType.Individual },
    },
  });

  const handleSubmit = methods.handleSubmit(async (data) => {
    await mutate(
      transformLessonToCreate(data, dayOfTheWeek, trainerScheduleId),
      {
        async onSuccess() {
          await queryClient.invalidateQueries({
            queryKey: trainerApiKeys.getTimetableAll(),
          });
          onSuccess?.(data);
          showSuccess("Lesson was successfully added");
        },
        onError(e) {
          showApiError(e);
        },
      }
    );
  });

  return (
    <FormWrapper methods={methods} className={className}>
      <div className={"flex items-center gap-3"}>
        <FromToTime nameFrom={"from"} nameTo={"to"} />
        <LessonTypeDropdown />
      </div>
      <div className={"flex gap-5"}>
        <Button
          disabled={isLoading}
          variant={"outlined"}
          color={"error"}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button disabled={isLoading} onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </FormWrapper>
  );
};
