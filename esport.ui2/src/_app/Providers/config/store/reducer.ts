import { combineReducers } from "redux";
import { StateSchema } from "./StateSchema";

import { leftSidebarReducer } from "@/widgets/LeftSidebar";
import { snackbarReducer } from "@/features/Snackbar";
import { userReducer } from "@/entities/user";

export const reducer = combineReducers<StateSchema>({
  leftSidebar: leftSidebarReducer,
  snackbar: snackbarReducer,
  user: userReducer,
});
