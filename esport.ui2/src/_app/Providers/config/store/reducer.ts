import { combineReducers } from "redux";
import { StateSchema } from "./StateSchema";

import { deviceReducer } from "@/shared/model";

import { userReducer } from "@/entities/user";
import { profileReducer } from "@/entities/profile";

import { snackbarReducer } from "@/features/Snackbar";

import { leftSidebarReducer } from "@/widgets/LeftSidebar";

export const reducer = combineReducers<StateSchema>({
  leftSidebar: leftSidebarReducer,
  snackbar: snackbarReducer,
  user: userReducer,
  device: deviceReducer,
  profile: profileReducer,
});
