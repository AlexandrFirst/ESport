import React, { FC, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";

import { Button, Dropdown, FormWrapper } from "@/shared/ui";
import { useSnackbar } from "@/shared/lib";
import { DayOfTheWeek } from "@/shared/constants";

import {
  FromToTime,
  LessonType,
  useTranslatedLessonType,
} from "@/entities/lesson";
import { TrainerApi, trainerApiKeys } from "@/entities/trainer";

import { useValidation } from "../../lib/hooks/useValidation";
import { IAddLessonForm } from "../../model/types/AddLessonForm";
import { transformLessonToCreate } from "../../lib/helpers/transformLessonToCreate/transformLessonToCreate";

interface AddLessonFormProps {
  className?: string;
  onSuccess?: () => void;
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
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<IAddLessonForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      from: "11:00",
      to: "12:00",
      lessonType: { title: "Individual", value: LessonType.Individual },
    },
  });

  const handleSubmit = methods.handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      await TrainerApi().createLesson(
        transformLessonToCreate(data, dayOfTheWeek, trainerScheduleId)
      );
      await queryClient.invalidateQueries({
        queryKey: trainerApiKeys.getTimetableAll(),
      });
      onSuccess?.();
    } catch (e) {
      showApiError(e);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <FormWrapper methods={methods} className={className}>
      <div className={"flex items-center gap-3"}>
        <FromToTime nameFrom={"from"} nameTo={"to"} />
        <Dropdown
          name={"lessonType"}
          label={"Lesson type"}
          list={[
            {
              title: translatedLessonType[LessonType.Individual],
              value: LessonType.Individual,
            },
            {
              title: translatedLessonType[LessonType.Group],
              value: LessonType.Group,
            },
          ]}
          displayValue={"title"}
          displayKey={"value"}
        />
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
