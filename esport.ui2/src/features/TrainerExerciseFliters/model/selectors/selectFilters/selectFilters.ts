import { buildSelector } from "@/shared/lib";

export const [useSelectTrainerExerciseFilters, selectTrainerExerciseFilters] =
  buildSelector((state) => state.trainerExerciseFliters);
