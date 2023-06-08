import { useMutation } from "@tanstack/react-query";

import { ExerciseApi } from "../../api/ExerciseApi";

import { exerciseApiKeys } from "./exerciseApiKeys";

export const useTrainerCreateExercise = () => {
  return useMutation({
    mutationKey: exerciseApiKeys.createExercise(),
    mutationFn: async (formData: FormData) => {
      try {
        const { data } = await ExerciseApi().createExercise(formData);
        return data;
      } catch (e) {
        throw e;
      }
    },
  });
};
