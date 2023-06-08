import { buildSelector } from "@/shared/lib";

export const [
  useSelectTraineeRecommendationFilters,
  selectTraineeRecommendationFilters,
] = buildSelector((state) => state.traineeRecommendationFilters);
