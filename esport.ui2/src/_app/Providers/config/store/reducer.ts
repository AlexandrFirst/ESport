import { combineReducers } from "redux";
import { StateSchema } from "./StateSchema";

import { deviceReducer } from "@/shared/model";

import { userReducer } from "@/entities/user";
import { profileReducer } from "@/entities/profile";

import { snackbarReducer } from "@/features/Snackbar";
import { GymsFiltersReducer } from "@/features/GymsFilters";
import { TrainerExerciseFlitersReducer } from "@/features/TrainerExerciseFliters";

import { leftSidebarReducer } from "@/widgets/LeftSidebar";
import {
  profileInformationReducer,
  roleProfileInformationReducer,
} from "@/widgets/ProfileInformation";
import { TraineeRecommendationFiltersReducer } from "@/features/TraineeRecommendationFilters";

export const reducer = combineReducers<StateSchema>({
  leftSidebar: leftSidebarReducer,
  snackbar: snackbarReducer,
  user: userReducer,
  device: deviceReducer,
  profile: profileReducer,
  profileInformation: profileInformationReducer,
  roleProfileInformation: roleProfileInformationReducer,
  gymsFilters: GymsFiltersReducer,
  trainerExerciseFliters: TrainerExerciseFlitersReducer,
  traineeRecommendationFilters: TraineeRecommendationFiltersReducer,
});
