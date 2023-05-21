export { ProfileInformation } from "./ui/ProfileInformation/ProfileInformation";

export type { ProfileInformationState } from "./model/types/ProfileInformationState";
export type { TrainerProfileInformationState } from "./model/types/trainerProfileInformationState";

export {
  useProfileInformationActions,
  profileInformationActions,
  profileInformationReducer,
} from "./model/slices/ProfileInformationSlice";

export {
  trainerProfileInformationReducer,
  useTrainerProfileInformationActions,
  trainerProfileInformationActions,
} from "./model/slices/trainerProfileInformationSlice";
