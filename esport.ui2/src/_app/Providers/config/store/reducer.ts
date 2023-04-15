import { combineReducers } from "redux";

import { leftSidebarReducer } from "@/widgets/LeftSidebar";

import { StateSchema } from "./StateSchema";
import { snackbarReducer } from "@/features/Snackbar";

export const reducer = combineReducers<StateSchema>({
  leftSidebar: leftSidebarReducer,
  snackbar: snackbarReducer,
});
