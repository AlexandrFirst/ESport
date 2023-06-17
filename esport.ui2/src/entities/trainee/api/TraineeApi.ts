import { ApiContext } from "@/shared/types";
import { Api } from "@/shared/config";
import {
  GetTraineeRecommendationsRequest,
  GetTraineeRecommendationsResponse,
} from "./types/types";

export const TraineeApi = async (ctx?: ApiContext) => {
  const instance = await Api({ ctx });

  return {
    async getTraineeRecommendations(request: GetTraineeRecommendationsRequest) {
      return instance.post<GetTraineeRecommendationsResponse>(
        "/trainee-lesson-recomendation",
        request
      );
    },
  };
};
