export const exerciseApiKeys = {
  all: ["excercises"] as const,
  createExercise: () => [...exerciseApiKeys.all, "createExercise"] as const,
};
