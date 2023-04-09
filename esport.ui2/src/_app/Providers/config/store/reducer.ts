import { combineReducers } from "redux";
import { leftSidebarReducer } from "../../../../features/LeftSidebar";

import { StateSchema } from "./StateSchema";

export const reducer = combineReducers<StateSchema>({
  leftSidebar: leftSidebarReducer,
});
