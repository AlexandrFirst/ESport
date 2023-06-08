import { GetTraineeRecommendationsRequest } from "../types/types";

export const traineeApiKeys = {
  all: ["trainee"] as const,
  getTraineeRecommendationsAll: () =>
    [...traineeApiKeys.all, "getTraineeRecommendations"] as const,
  getTraineeRecommendations: (request: GetTraineeRecommendationsRequest) =>
    [...traineeApiKeys.getTraineeRecommendationsAll(), request] as const,
};
