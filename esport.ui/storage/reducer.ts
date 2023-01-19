import { combineReducers } from "redux";

import { loadingIndicatorReducer } from "@storage/slices/loadingIndicator";
import { userReducer } from "@storage/slices/user";
import { layoutReducer } from "@storage/slices/layout";

export const reducer = combineReducers({
  user: userReducer,
  loadingIndicator: loadingIndicatorReducer,
  layout: layoutReducer,
});
