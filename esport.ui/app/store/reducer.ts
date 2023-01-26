import { combineReducers } from "redux";

import { loadingIndicatorReducer } from "@features/TopPageLoader/topPageLoader.slice";
import { userReducer } from "../../entities/user/model/user.slice";
import { layoutReducer } from "../../layouts/MainLayout/mainLayout.slice";

export const reducer = combineReducers({
  user: userReducer,
  loadingIndicator: loadingIndicatorReducer,
  layout: layoutReducer,
});
