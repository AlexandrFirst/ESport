import { useMutation } from "@tanstack/react-query";

import { TrainerApi } from "../../api/trainerApi";
import { trainerApiKeys } from "../../api/hooks/trainerApiKeys";
import { CreateLessonRequest } from "../../api/types/types";

export const useCreateLesson = () => {
  return useMutation({
    mutationKey: trainerApiKeys.createLesson(),
    mutationFn: async (request: CreateLessonRequest) => {
      try {
        await TrainerApi().createLesson(request);
      } catch (e) {
        throw e;
      }
    },
  });
};
