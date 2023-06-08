export { Trainee } from "./ui/Trainee/Trainee";
export type { TraineeSchema } from "./model/types/traineeSchema";

//api
export { TraineeApi } from "./api/TraineeApi";
export { traineeApiKeys } from "./api/hooks/traineeApiKeys";
export {
  useGetTraineeRecommendations,
  getTraineeRecommendations,
} from "./api/hooks/useGetTraineeRecommendations";

//api types
export type { GetTraineeRecommendationsRequest } from "./api/types/types";
